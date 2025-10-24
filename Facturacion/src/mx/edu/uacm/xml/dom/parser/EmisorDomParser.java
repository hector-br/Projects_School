package mx.edu.uacm.xml.dom.parser;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import mx.edu.uacm.xml.bean.EmisorBean;

import org.w3c.dom.NodeList;
import org.w3c.dom.Node;

public class EmisorDomParser {

	private Document document;
	
	private EmisorBean emisorBean = new EmisorBean();
	
	public EmisorDomParser() throws ParserConfigurationException, SAXException, IOException {
		
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder  documentBuilder = factory.newDocumentBuilder();
		
		document = documentBuilder.parse(ClassLoader.getSystemResourceAsStream("xml/emisor.xml"));
		//System.out.println("Archivo parseado");
		
	}
	
	
	public void parse() {
		
		//System.out.println("Parsing document");
		
		NodeList nodeList = document.getElementsByTagName("emisor");
		Node node = nodeList.item(0);
		nodeList = node.getChildNodes();
		
		for(int i=0; i<nodeList.getLength(); i++) {
			
			Node nodoTemp = nodeList.item(i);
			
			switch(nodoTemp.getNodeName()) {
				case "razonSocial":
					//System.out.println("razo social: " + nodoTemp.getTextContent());
					emisorBean.setRazonSocial(nodoTemp.getTextContent());
					break;
				case "rfc":
					//System.out.println("RFC: " + nodoTemp.getTextContent());
					emisorBean.setRfc(nodoTemp.getTextContent());
					break;
				case "direccion":
					emisorBean.setDireccion(nodoTemp.getTextContent());
					break;
			}
		}
		System.out.println(emisorBean);
	}
	
}
