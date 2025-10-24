package mx.edu.uacm.xml.facturar;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;

import org.xml.sax.SAXException;

import com.sun.corba.se.spi.orbutil.fsm.Input;

import mx.edu.uacm.xml.bean.EmisorBean;
import mx.edu.uacm.xml.bean.ReceptorBean;
import mx.edu.uacm.xml.bean.CompraBean;
import mx.edu.uacm.xml.bean.ProductosBean;
import mx.edu.uacm.xml.dom.parser.EmisorDomParser;
import mx.edu.uacm.xml.dom.parser.CompraDOMParser;
import mx.edu.uacm.xml.handler.CompraSAXParser;
import mx.edu.uacm.xml.handler.EmisorSAXParser;
import mx.edu.uacm.xml.handler.ReceptorSAXParser;
import mx.edu.uacm.xml.dom.parser.ReceptorDomParser;


public class Facturacion {

	public static EmisorBean emisor =  new EmisorBean();
	public static ReceptorBean receptor =  new ReceptorBean();
	public static CompraBean compra =  new CompraBean();
	public static EmisorBean emisorBean = null;
	public static ReceptorBean receptorBean = null;
	public static CompraBean compraBean = null;
	public static ProductosBean productosBean = null;
	private static String contenido;
	private static String contenidoo;
	private static String contenidooo;
	
	public static void main(String[] args) throws ParserConfigurationException, SAXException, IOException {
		
		
		Scanner scanner = new  Scanner(System.in);
		
		System.out.println("Seleccion el tipo de parseo:\n1.DOM\n2.SAX\n3.STAX\n");
		String  op = scanner.nextLine();
		
		switch(op) {
			case "DOM":
				EmisorDomParser emisorParser =  new EmisorDomParser();
				ReceptorDomParser receptorParser =  new ReceptorDomParser();
				emisorParser.parse(); //DOM emisro.xml
				receptorParser.parseR(); //DOM receptro.xml
				// DOM compra.xml 
				
				CompraDOMParser compraParser = new CompraDOMParser();
				compraParser.parseC();
				break;
			case "SAX":
				SAXParserFactory factory = SAXParserFactory.newInstance();
				SAXParser parser  =  factory.newSAXParser();
				EmisorSAXParser handler = new EmisorSAXParser();
				ReceptorSAXParser handlerr = new ReceptorSAXParser();
				CompraSAXParser handlerc = new CompraSAXParser();
				
				//SAX emisor.xml
				parser.parse(ClassLoader.getSystemResourceAsStream("xml/emisor.xml"), handler);
				System.out.println(emisor);	
				
				//SAX receptor.xml
				parser.parse(ClassLoader.getSystemResourceAsStream("xml/receptor.xml"), handlerr);
				System.out.println(receptor);	
				
				//SAX compra.xml
				parser.parse(ClassLoader.getSystemResourceAsStream("xml/compra.xml"), handlerc);
				System.out.println(compra);
				
				
				break;
			case "STAX":
				//Emisor.xml
				try {
					EmisorSTAXParser(args);
				} catch (XMLStreamException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				// Recepptor.xml
				try {
					ReceptorSTAXParser(args);
				} catch (XMLStreamException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				//compara .xml
				try {
					CompraSTAXParser(args);
				} catch (XMLStreamException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				break;
			default:
				System.out.println("Opcion invalida");
				break;
		}
		
	}
	
	
	public static void EmisorSTAXParser(String [] args ) throws XMLStreamException{
		
		XMLInputFactory factory =  XMLInputFactory.newInstance();
		XMLStreamReader xmlStreamReader = factory.createXMLStreamReader(ClassLoader.getSystemResourceAsStream("xml/emisor.xml"), contenido);
		
		while(xmlStreamReader.hasNext()) {
			int event = xmlStreamReader.next();
			
			switch (event) {
				case XMLStreamConstants.START_ELEMENT:
					if(xmlStreamReader.getLocalName().equals("emisor"))
						emisorBean = new EmisorBean();
					break;
					
				case XMLStreamConstants.CHARACTERS:
					contenido =  xmlStreamReader.getText();
					break;
				case XMLStreamConstants.END_ELEMENT:
					
					switch(xmlStreamReader.getLocalName()) {
					
						case "razonSocial":
							emisorBean.setRazonSocial(contenido);	
							break;
						case "rfc":	
							emisorBean.setRfc(contenido);
							break;
						case "direccion":
							emisorBean.setDireccion(contenido);
							break;
							default:break;
						}
				default:
					break;
				
			}
		}
		System.out.println(emisorBean);
		
	}
	
	public static void ReceptorSTAXParser(String [] args) throws XMLStreamException{
		
		
		XMLInputFactory factory =  XMLInputFactory.newInstance();
		XMLStreamReader xmlStreamReader = factory.createXMLStreamReader(ClassLoader.getSystemResourceAsStream("xml/receptor.xml"), contenidoo);
		
		while(xmlStreamReader.hasNext()) {
			int event = xmlStreamReader.next();
			
			switch (event) {
				case XMLStreamConstants.START_ELEMENT:
					if(xmlStreamReader.getLocalName().equals("receptor"))
						receptorBean = new ReceptorBean();
					break;
					
				case XMLStreamConstants.CHARACTERS:
					contenidoo =  xmlStreamReader.getText();
					break;
				case XMLStreamConstants.END_ELEMENT:
					
					switch(xmlStreamReader.getLocalName()) {
					
						case "rfc":
							receptorBean.setRfc(contenidoo);
							break;
						case "razonSocia":
							receptorBean.setRazonSocial(contenidoo);
							break;
						case "regimen":
							receptorBean.setRegimen(contenidoo);
							break;
						case "uso-CFDI":
							receptorBean.setCDFI(contenidoo);
							break;
						case "cp":
							receptorBean.setCp(Integer.parseInt(contenidoo));
							break;
							default:break;
						}
				default:
					break;
				
			}
		}
		System.out.println(receptorBean);
		
		
	}
	
	
public static void CompraSTAXParser(String [] args ) throws XMLStreamException{
		
		XMLInputFactory factory =  XMLInputFactory.newInstance();
		XMLStreamReader xmlStreamReader = factory.createXMLStreamReader(ClassLoader.getSystemResourceAsStream("xml/compra.xml"), contenidooo);
		List<ProductosBean> productos = new ArrayList<>();
		while(xmlStreamReader.hasNext()) {
			int event = xmlStreamReader.next();
			
			switch (event) {
				case XMLStreamConstants.START_ELEMENT:
					if(xmlStreamReader.getLocalName().equals("producto")) {
						compraBean = new CompraBean();
						productosBean = new ProductosBean();
					}
						
					break;
					
				case XMLStreamConstants.CHARACTERS:
					contenidooo =  xmlStreamReader.getText();
					break;
					
				case XMLStreamConstants.END_ELEMENT:
					
					switch(xmlStreamReader.getLocalName()) {
					
						case "cantidad":
							productosBean.setCantidad(Integer.parseInt(contenidooo));	
							break;
						case "descripcion":	
							productosBean.setDescripcion(contenidooo);
							break;
						case "importe":
							productosBean.setImporte(Integer.parseInt(contenidooo));
							break;
						case "producto":
							productos.add(productosBean);
							compraBean.getProductos().addAll(productos);
							break;
						default:break;
						}
					
				default:
					break;
				
			}
			
			
		}
		System.out.println(compraBean);
		
	}
	
	//subtotal , iva , total
	

}
