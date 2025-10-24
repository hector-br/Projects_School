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

import mx.edu.uacm.xml.bean.ReceptorBean;

import org.w3c.dom.NodeList;
import org.w3c.dom.Node;

public class ReceptorDomParser {

	private Document document;
	
	private ReceptorBean receptorBean = new ReceptorBean();
	
	public ReceptorDomParser() throws ParserConfigurationException, SAXException, IOException {
		
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder  documentBuilder = factory.newDocumentBuilder();
		
		document = documentBuilder.parse(ClassLoader.getSystemResourceAsStream("xml/receptor.xml"));
		//System.out.println("Archivo parseado");
		
	}
	
	
	public void parseR() {
		
		//System.out.println("Parsing document");
		
		NodeList nodeList = document.getElementsByTagName("receptor");
		Node node = nodeList.item(0);
		nodeList = node.getChildNodes();
		
		for (int i=0; i<nodeList.getLength(); i++) {
			
			Node nodoTemp =  nodeList.item(i);
			switch(nodoTemp.getNodeName()) {
				case "rfc":
					receptorBean.setRfc(nodoTemp.getTextContent());
					break;
				case "razonSocia":
					receptorBean.setRazonSocial(nodoTemp.getTextContent());
					break;
				case "regimen":
					receptorBean.setRegimen(nodoTemp.getTextContent());
					break;
				case "uso-CFDI":
					receptorBean.setCDFI(nodoTemp.getTextContent());
					break;
				case "cp":
					receptorBean.setCp(new Integer(nodoTemp.getTextContent()));
					break;
			}
		}
		
		
		System.out.println(receptorBean);
	}
	
}
