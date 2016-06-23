function Button(text)
{
	this.id = "Button";
	this.label = text;
	this.children = [];
	
	this.addSelfTo = function(parent, id)
	{
		var con = document.createElement('button');
		this.id = this.id + "_" + id;
		con.style.display = "inline-block";
		con.id = this.id;
		con.innerHTML = this.label;
		
		if(document.getElementById(parent) != null)
			document.getElementById(parent).appendChild(con);
	}
}