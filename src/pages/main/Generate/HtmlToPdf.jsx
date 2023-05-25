import React, { FC, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import img from "./header.png"

// interface GenerateProps { }

const HTMLToPDFConverter = () => {
  const contentRef = useRef(null);
  // const contentRef = useRef < HTMLDivElement > (null);

  const handleConvertToPDF = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('converted.pdf');
      });
    }
  };

  return (
    <>
      <button type='button' className='html-to-pdf-btn' onClick={handleConvertToPDF}>Convert to PDF</button>


      <div ref={contentRef}>
        <header style={{ width: '100%' }}>
          <img src={img} alt="Image Description" />
          <table style={{ color: "black" }}>
            <tr>
              <td colspan="2">Exam Name</td>
            </tr>
            <tr>
              <td colspan="2">Date</td>
            </tr>
            <tr>
              <td>Max Marks</td>
              <td>Duration</td>
            </tr>
            <tr>
              <td>Class</td>
              <td>Semester</td>
            </tr>
            <tr>
              <td>Course Code</td>
              <td>Branch</td>
            </tr>
            <tr>
              <td colspan="2">Name of the Course</td>
            </tr>
            <tr>
              <td colspan="2" class="instructions">Instructions:<br />
                (1) All Questions are Compulsory<br />
                (2) Assume suitable data if necessary<br />
                (3) Full working to be shown<br />
                (4) Start each section on a fresh page.</td>
            </tr>
          </table>




        </header>
        <main>
          Content here
        </main>

      </div>
    </>
  );
};

export default HTMLToPDFConverter;
