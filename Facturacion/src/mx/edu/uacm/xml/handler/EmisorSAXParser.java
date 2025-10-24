package mx.edu.uacm.xml.handler;

import java.util.ArrayList;
import java.util.List;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import mx.edu.uacm.xml.facturar.Facturacion;

public class EmisorSAXParser  extends DefaultHandler{

	private String content;
	@Override
	public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
		
	}

	@Override
	public void endElement(String uri, String localName, String qName) throws SAXException {
		
		switch(qName) {
			case "razonSocial":
				Facturacion.emisor.setRazonSocial(content);
				break; 
			case "rfc":
				Facturacion.emisor.setRfc(content);
				break;
			case "direccion":
				Facturacion.emisor.setDireccion(content);
				break;
		}
	
	}

	@Override
	public void characters(char[] ch, int start, int length) throws SAXException {
		
		content = String.copyValueOf(ch, start, length);	
	}
	
	
}
