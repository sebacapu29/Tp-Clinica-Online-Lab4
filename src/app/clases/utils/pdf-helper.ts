import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';

export class PdfHelper {

    private pdfHelper:jsPDF;

    constructor(){
        this.pdfHelper = new jsPDF();
    }

    public EscribirPDF(nombre:string,elementId:string){
        var element = document.getElementById(elementId);
        html2canvas(element).then((canvas)=>{
            console.log(canvas);
            var imgData = canvas.toDataURL('image/png');

            var imgalto= canvas.height*208/canvas.width;

            this.pdfHelper.addImage(imgData,0,0,208,imgalto);
            this.GuardarPDF(nombre);
        })

    }
    public GuardarPDF(nombre:string){
        // Save the PDF
        this.pdfHelper.save(nombre+'.pdf');
    }
}
