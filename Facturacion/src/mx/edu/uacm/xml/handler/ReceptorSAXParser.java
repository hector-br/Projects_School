package mx.edu.uacm.xml.handler;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import mx.edu.uacm.xml.facturar.Facturacion;

public class ReceptorSAXParser extends DefaultHandler{

	private String content;

	@Override
	public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {

		
	}

	@Override
	public void endElement(String uri, String localName, String qName) throws SAXException {
		
		
		switch(qName) {
			case "rfc":
				Facturacion.receptor.setRfc(content);
				break;
			case "razonSocia":
				Facturacion.receptor.setRazonSocial(content);
				break;
			case "regimen":
				Facturacion.receptor.setRegimen(content);
				break;
			case "uso-CFDI":
				Facturacion.receptor.setCDFI(content);
				break;
			case "cp":
				Facturacion.receptor.setCp(Integer.parseInt(content));
				break;
		}
	}

	@Override
	public void characters(char[] ch, int start, int length) throws SAXException {
		content = String.copyValueOf(ch, start, length);
	}
	
	
	
}
