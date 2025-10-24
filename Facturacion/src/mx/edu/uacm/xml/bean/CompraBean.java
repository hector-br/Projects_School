package mx.edu.uacm.xml.bean;

import java.util.ArrayList;
import java.util.List;

public class CompraBean {

	private List<ProductosBean> productos;

	
	public CompraBean() {
		this.productos = new ArrayList<ProductosBean>();
	}
	public List<ProductosBean> getProductos() {
		return productos;
	}

	public void setProductos(List<ProductosBean> productos) {
		this.productos = productos;
	}
	
	
	@Override
	public String toString() {
		StringBuffer br = new StringBuffer();
	
		if(this.productos.size()>0)
			br.append("\nProductos:");
		
		for(ProductosBean producto: this.productos) {
			br.append("\t");
			br.append("\nCantidad: ");
			br.append(producto.getCantidad());
			br.append("\nDescripcion: ");
			br.append(producto.getDescripcion());
			br.append("\nImporte: ");
			br.append(producto.getImporte());
			br.append("\n");
		}
		
		return br.toString();
	}
		
}
