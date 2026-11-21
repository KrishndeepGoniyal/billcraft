import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

/**
 * Client-Side PDF Generation Utility using html-to-image & jsPDF
 *
 * Implements robust off-screen cloning:
 * - Clones #invoice-printable into a visible off-screen container attached to document.body
 * - Strips any CSS transform/scale from clone to guarantee full 794px A4 layout
 * - Works reliably even when live preview is hidden (e.g. mobile "Edit" tab)
 * - Verifies image naturalWidth & naturalHeight before calling jsPDF to prevent
 *   "Invalid argument passed to jsPDF.scale" errors
 * - Slices multiple pages only while heightLeft > 1mm (preventing empty page 2)
 * - Safely cleans up off-screen wrapper in a finally block
 */

export const generatePdfFromElement = async (
  elementId = 'invoice-printable',
  filename = 'invoice.pdf',
  onProgress
) => {
  // 1. Locate source element
  const sourceElement =
    document.getElementById(elementId) ||
    document.getElementById('invoice-printable') ||
    document.getElementById('invoice-preview-root');

  if (!sourceElement) {
    throw new Error(`Invoice element not found (looked for "#${elementId}")`);
  }

  if (onProgress) onProgress(15, 'Preparing document canvas...');

  let wrapper = null;

  try {
    // 2. Clone into visible off-screen container attached to document.body
    wrapper = document.createElement('div');
    wrapper.id = 'pdf-render-wrapper';
    wrapper.style.cssText =
      'position: fixed; top: 0; left: -10000px; width: 794px; background: #ffffff; color: #0f172a; z-index: -1; pointer-events: none; overflow: visible;';

    const clone = sourceElement.cloneNode(true);

    // Strip any CSS transform / scale and enforce exact A4 printable dimensions
    clone.style.transform = 'none';
    clone.style.webkitTransform = 'none';
    clone.style.width = '794px';
    clone.style.minHeight = '1123px';
    clone.style.height = 'auto';
    clone.style.maxWidth = '794px';
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';
    clone.style.border = 'none';
    clone.style.backgroundColor = '#ffffff';
    clone.style.color = '#0f172a';

    // Strip transform on all descendant elements if any
    const transformedChildren = clone.querySelectorAll('*');
    transformedChildren.forEach((el) => {
      if (el.style && el.style.transform && el.style.transform.includes('scale')) {
        el.style.transform = 'none';
      }
    });

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    if (onProgress) onProgress(35, 'Waiting for fonts & layout...');

    // Wait for document.fonts.ready
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // Wait two requestAnimationFrame ticks for layout stabilization
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );

    if (onProgress) onProgress(55, 'Rendering high-resolution snapshot...');

    // 3. Capture using html-to-image
    const dataUrl = await toPng(clone, {
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
      width: 794,
    });

    if (onProgress) onProgress(75, 'Verifying image snapshot...');

    // 4. Load resulting dataUrl into Image Promise and verify dimensions
    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (err) =>
        reject(new Error('Failed to load snapshot image into memory'));
      image.src = dataUrl;
    });

    const naturalWidth = img.naturalWidth || img.width;
    const naturalHeight = img.naturalHeight || img.height;

    if (
      !naturalWidth ||
      !naturalHeight ||
      naturalWidth <= 0 ||
      naturalHeight <= 0 ||
      !isFinite(naturalWidth) ||
      !isFinite(naturalHeight)
    ) {
      throw new Error(
        `Invalid image dimensions captured (${naturalWidth}x${naturalHeight}). Check element visibility.`
      );
    }

    if (onProgress) onProgress(85, 'Compiling A4 PDF pages...');

    // 5. Render onto A4 (210mm x 297mm)
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeightMm = (naturalHeight * pageWidth) / naturalWidth;

    if (!isFinite(imgHeightMm) || imgHeightMm <= 0) {
      throw new Error(`Calculated invalid PDF image height: ${imgHeightMm}`);
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    let heightLeft = imgHeightMm;
    let position = 0;

    // First page
    pdf.addImage(dataUrl, 'PNG', 0, position, pageWidth, imgHeightMm, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Slicing cleanly across multiple pages only while heightLeft > 1mm (prevents blank page 2)
    while (heightLeft > 1) {
      position = heightLeft - imgHeightMm;
      pdf.addPage();
      pdf.addImage(dataUrl, 'PNG', 0, position, pageWidth, imgHeightMm, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    if (onProgress) onProgress(95, 'Saving PDF file...');
    pdf.save(filename);

    if (onProgress) onProgress(100, 'Complete!');
    return true;
  } catch (error) {
    console.error('PDF Generation failed:', error);
    throw error;
  } finally {
    // 6. Always clean up temporary off-screen wrapper
    if (wrapper && wrapper.parentNode) {
      wrapper.parentNode.removeChild(wrapper);
    }
  }
};

/**
 * Native Browser Print Trigger (Leverages @media print rules in index.css)
 */
export const triggerBrowserPrint = () => {
  window.print();
};
