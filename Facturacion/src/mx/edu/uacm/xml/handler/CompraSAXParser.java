package mx.edu.uacm.xml.handler;

import java.util.ArrayList;
import java.util.List;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import mx.edu.uacm.xml.bean.ProductosBean;
import mx.edu.uacm.xml.facturar.Facturacion;

import org.xml.sax.helpers.DefaultHandler;

public class CompraSAXParser extends DefaultHandler{

	private String content;
	private ProductosBean productos;
	int count = 0;
	@Override
	public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
		if(qName.equals("producto")) {
			productos = new ProductosBean();
		}
		count++;
	}

	@Override
	public void characters(char[] ch, int start, int length) throws SAXException {
	
		content = String.copyValueOf(ch, start, length);
		
	}
	
	@Override
	public void endElement(String uri, String localName, String qName) throws SAXException {
		
		List<ProductosBean> productosList = new ArrayList<>();
		switch(qName){
			case "cantidad":
				productos.setCantidad(Integer.parseInt(content));	
				break;
			case "descripcion":
				productos.setDescripcion(content);
				break;
			case "importe":
				productos.setImporte(Integer.parseInt(content));
				break;
			case "producto":
				productosList.add(productos);
				Facturacion.compra.getProductos().add(productos);
				break;
		}
		
	}


	

}
