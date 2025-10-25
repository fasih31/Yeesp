import { mdToPdf } from 'md-to-pdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDFGuide() {
  console.log('🚀 Generating YEESP Platform PDF Guide...\n');

  const inputFile = path.join(__dirname, '..', 'GUIDE.md');
  const outputFile = path.join(__dirname, '..', 'YEESP-Platform-Guide.pdf');

  if (!fs.existsSync(inputFile)) {
    console.error('❌ Error: GUIDE.md not found!');
    process.exit(1);
  }

  const pdfOptions = {
    dest: outputFile,
    pdf_options: {
      format: 'A4',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%; color: #666; padding: 10px 20px;">
          <span>YEESP Platform - Complete User Guide</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%; color: #666; padding: 10px 20px;">
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span> | Developed by Fasih ur Rehman</span>
        </div>
      `
    },
    stylesheet: [
      'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown.min.css'
    ],
    body_class: 'markdown-body',
    marked_options: {
      headerIds: true,
      mangle: false
    },
    css: `
      @page {
        size: A4;
        margin: 20mm;
      }

      .markdown-body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 11pt;
        line-height: 1.6;
        color: #24292e;
        max-width: 100%;
        padding: 20px;
      }

      .markdown-body h1 {
        color: #2563eb;
        border-bottom: 3px solid #2563eb;
        padding-bottom: 10px;
        margin-top: 30px;
        margin-bottom: 20px;
        font-size: 28pt;
        page-break-before: auto;
      }

      .markdown-body h2 {
        color: #1e40af;
        border-bottom: 2px solid #ddd;
        padding-bottom: 8px;
        margin-top: 25px;
        margin-bottom: 15px;
        font-size: 20pt;
        page-break-after: avoid;
      }

      .markdown-body h3 {
        color: #1e3a8a;
        margin-top: 20px;
        margin-bottom: 10px;
        font-size: 16pt;
        page-break-after: avoid;
      }

      .markdown-body h4 {
        color: #374151;
        margin-top: 15px;
        margin-bottom: 8px;
        font-size: 14pt;
      }

      .markdown-body p {
        margin-bottom: 10px;
        text-align: justify;
      }

      .markdown-body ul, .markdown-body ol {
        margin-bottom: 15px;
        padding-left: 25px;
      }

      .markdown-body li {
        margin-bottom: 5px;
      }

      .markdown-body code {
        background-color: #f6f8fa;
        padding: 3px 6px;
        border-radius: 3px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 10pt;
        color: #e83e8c;
      }

      .markdown-body pre {
        background-color: #f6f8fa;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        padding: 16px;
        overflow-x: auto;
        margin-bottom: 16px;
        page-break-inside: avoid;
      }

      .markdown-body pre code {
        background-color: transparent;
        padding: 0;
        color: #24292e;
      }

      .markdown-body blockquote {
        border-left: 4px solid #2563eb;
        padding-left: 16px;
        margin-left: 0;
        color: #6b7280;
        font-style: italic;
      }

      .markdown-body table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 16px;
        page-break-inside: avoid;
      }

      .markdown-body table th {
        background-color: #2563eb;
        color: white;
        padding: 10px;
        text-align: left;
        font-weight: bold;
      }

      .markdown-body table td {
        border: 1px solid #ddd;
        padding: 8px;
      }

      .markdown-body table tr:nth-child(even) {
        background-color: #f9fafb;
      }

      .markdown-body hr {
        border: none;
        border-top: 2px solid #e5e7eb;
        margin: 30px 0;
      }

      .markdown-body a {
        color: #2563eb;
        text-decoration: none;
      }

      .markdown-body a:hover {
        text-decoration: underline;
      }

      .markdown-body strong {
        color: #1f2937;
        font-weight: 600;
      }

      .page-break {
        page-break-after: always;
      }

      @media print {
        .markdown-body h1, .markdown-body h2, .markdown-body h3 {
          page-break-after: avoid;
        }
        
        .markdown-body ul, .markdown-body ol, .markdown-body pre {
          page-break-inside: avoid;
        }
      }
    `
  };

  try {
    console.log('📄 Converting Markdown to PDF...');
    
    const pdf = await mdToPdf({ path: inputFile }, pdfOptions);
    
    if (pdf) {
      const stats = fs.statSync(outputFile);
      const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      
      console.log('\n✅ PDF Guide generated successfully!');
      console.log(`📁 Location: ${outputFile}`);
      console.log(`📊 File size: ${fileSizeInMB} MB`);
      console.log('\n🎉 Your comprehensive YEESP Platform Guide is ready!');
      console.log('   Share this with your users for complete platform documentation.\n');
    }
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

generatePDFGuide();
