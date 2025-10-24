package mx.edu.uacm.xml.bean;

import java.util.List;

public class EmisorBean {

	private String razonSocial;
	private String rfc;
	private String direccion;
	
	public String getRazonSocial() {
		return razonSocial;
	}
	public void setRazonSocial(String razonSocial) {
		this.razonSocial = razonSocial;
	}
	public String getRfc() {
		return rfc;
	}
	public void setRfc(String rfc) {
		this.rfc = rfc;
	}

	
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	
	@Override
	public String toString() {
		StringBuffer br = new StringBuffer();
		br.append("\nEmisor");
		br.append("\nRazon soical:");
		br.append(razonSocial);
		
		br.append("\nRFC:");
		br.append(rfc);
		
		br.append("\nDireccion:");
		br.append(direccion);
		
		return br.toString();
	}
		
	
}
