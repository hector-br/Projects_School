package mx.edu.uacm.xml.bean;

public class ReceptorBean {
	
	private  String rfc;
	private String razonSocial;
	private String regimen;
	private String CDFI;
	private int cp;
	
	public String getRfc() {
		return rfc;
	}
	public void setRfc(String rfc) {
		this.rfc = rfc;
	}
	public String getRazonSocial() {
		return razonSocial;
	}
	public void setRazonSocial(String razonSocial) {
		this.razonSocial = razonSocial;
	}
	public String getRegimen() {
		return regimen;
	}
	public void setRegimen(String regimen) {
		this.regimen = regimen;
	}
	public String getCDFI() {
		return CDFI;
	}
	public void setCDFI(String cDFI) {
		CDFI = cDFI;
	}
	public int getCp() {
		return cp;
	}
	public void setCp(int cp) {
		this.cp = cp;
	}

	@Override
	public String toString() {
		StringBuffer br = new StringBuffer();
		br.append("\nReceptor");
		br.append("\nRFC:");
		br.append(rfc);
		
		br.append("\nRazon social:");
		br.append(razonSocial);
		
		br.append("\nRegimen:");
		br.append(regimen);
		
		br.append("\nUSO_CDFI:");
		br.append(CDFI);
		
		br.append("\nCodigoPostal:");
		br.append(cp);
		
		
		return br.toString();
	}
	
	
}
