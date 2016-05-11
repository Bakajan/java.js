function MenuBar()
{
	this.children = [];
	this.width = "100%";
	this.background = "linear-gradient(white, lightgray)";
	this.borderSize = "1px";
	this.borderStyle = "outset";
	this.id = 'menuBar';
	
	this.addSelfTo = function(parent, id)
	{
		var con = document.createElement('div');
		this.id = this.id + "_" + id;
		con.width = this.width;
		con.style.background = this.background;
		con.style.borderSize = this.borderSize;
		con.style.borderStyle = this.borderStyle;
		con.id = this.id;
		
		if(document.getElementById(parent) != null)
		{
		  document.getElementById(parent).appendChild(con);

		  for(var i = 0; i!= this.children.length; i++)
		  {
			  this.children[i].addSelfTo(this.id, i);
		  }
		}
	}
	
	this.add = function(object)
	{
		this.children.push(object);
		object.addSelfTo(this.id, this.children.length - 1);
	};
	
	this.getChild = function(id)
	{
		for(var i = 0; i != this.children.length; i++)
		{
			if(id === this.children[i].id)
				return this.children[i];
		}
	}
	
	this.setBorder = function(border)
	{
		this.borderStyle = border;
		if(document.getElementById(this.id) != null)
			document.getElementById(this.id).style.borderStyle = this.borderStyle;	
	}
	
	this.setBackground = function(background)
	{
		this.background = background;
		if(document.getElementById(this.id) != null)
			document.getElementById(this.id).style.background = this.background;	
	}
}
