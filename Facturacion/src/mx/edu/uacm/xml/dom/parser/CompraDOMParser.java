package mx.edu.uacm.xml.dom.parser;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;


import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import mx.edu.uacm.xml.bean.CompraBean;
import mx.edu.uacm.xml.bean.ProductosBean;

public class CompraDOMParser {

	private Document document;
	
	private CompraBean compraBean = new CompraBean();
	
	public CompraDOMParser() throws ParserConfigurationException, SAXException, IOException {
		
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder  documentBuilder = factory.newDocumentBuilder();
		
		document = documentBuilder.parse(ClassLoader.getSystemResourceAsStream("xml/compra.xml"));
		//System.out.println("Archivo parseado");
		
	}
	
	public void parseC() {
		
		NodeList nodeList = document.getElementsByTagName("productos");
		Node node = nodeList.item(0);
		nodeList = node.getChildNodes();
		List<ProductosBean> productosList = new ArrayList<>();
		
		for(int i=0; i<nodeList.getLength(); i++) {
			
			Node nodoTemp = nodeList.item(i);
			
			switch(nodoTemp.getNodeName()) {
			
				case "producto":
					
					
						NodeList productos = nodoTemp.getChildNodes();
						
						ProductosBean producto = new ProductosBean();
						for(int j=0; j<productos.getLength(); j++) {
							
							Node nodoProducto = productos.item(j);
							
							
							switch(nodoProducto.getNodeName()) {
								case "cantidad":
									//System.out.println("CAntidad: " + nodoProducto.getTextContent());
									producto.setCantidad(new Integer(nodoProducto.getTextContent()));
									break;
								case "descripcion":
									//System.out.println("descripcion: " + nodoProducto.getTextContent());
									producto.setDescripcion(nodoProducto.getTextContent());
									break;
								case "importe":
									//System.out.println("importe: " + nodoProducto.getTextContent());
									producto.setImporte(new Integer(nodoProducto.getTextContent()));
									break;
								default:
									break;
							}
							
						}
						productosList.add(producto);
					
			}
			compraBean.setProductos(productosList);
			
		}// Cierre del for
		System.out.println(compraBean);
		
	}
	
}
