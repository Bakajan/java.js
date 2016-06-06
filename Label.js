function Label(string)
{
	this.id;
	this.border = "none";
	this.text = string;
	
	this.addSelfTo = function(parent, id)
	{
		var con = document.createElement('div');
		this.id = this.id + "_" + id;
		con.style.border = this.border;
		con.style.display = "inline-block";
		con.id = this.id;
		con.innerHTML = this.text;
		
		if(document.getElementById(parent) != null)
			document.getElementById(parent).appendChild(con);
	}
}