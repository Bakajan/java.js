function MenuItem(label)
{
	this.label = label;
	this.background;
	this.display = "inline-block";
	this.padding = "5px";
	this.outline;
	this.textColor;
	this.id = 'menuItem';
	this.mouseOverListener;
	this.mouseOutListener;
	this.mouseClickListener;
	this.elementType;
	this.children = [];
	
	this.dropId;
	this.dropBorder = "1px gray solid";
	this.showFlag = false;
	this.width;
	
	this.add = function(object)
	{
		this.children.push(object);
		object.addSelfTo(this.id, this.children.length - 1);
	}
	
	this.addSelfTo = function(parent, id)
	{
		var con = document.createElement('div');
		var dropMenu = document.createElement('div');
		dropMenu.style.display = "none";
		dropMenu.style.boxShadow = "0px 8px 16px 0px rgba(0,0,0,0.2)";
		dropMenu.style.textAlign = "center";
		con.innerHTML = this.label;
		con.style.display = this.display;
		con.style.padding = this.padding;
		con.style.cursor = "pointer";
		
		if(document.getElementById(parent) != null)
		{
			this.id = this.id + "_" + id;
			con.id = this.id;
			this.dropId = this.id + "_dropMenu_" + id
			dropMenu.id = this.dropId;
			
			if(this.mouseOverListener != null)
				con.addEventListener('mouseover', this.mouseOverListener, false);
			else
			{
				con.addEventListener('mouseover', function() 
												  { 
													var el = document.getElementById(this.id);
													if(el === event.target)
													{
														this.border = "outset white";
														if(document.getElementById(this.id) != null)
															document.getElementById(this.id).style.outline = this.border; 
													}
												  }, false);
			}
			if(this.mouseOutListener != null)
				con.addEventListener('mouseout', this.mouseOutListener, false);
			else
			{
				con.addEventListener('mouseout', function() { this.border = "none";
											if(document.getElementById(this.id) != null)
											document.getElementById(this.id).style.outline = this.border; }
											, false);
			}
			if(this.mouseClickListener != null)
				con.addEventListener('click', this.mouseClickListener, false);
			else
			{
				con.addEventListener('click', function() { 
															if(document.getElementById(dropMenu.id) != null)
															{
																if(!this.showFlag)
																{
																	document.getElementById(dropMenu.id).style.display = "block";
																	var el = document.getElementById("item");
																	var par = document.getElementById(this.id);
																	document.getElementById(dropMenu.id).style.height = el.clientHeight*2;
																	document.getElementById(dropMenu.id).style.width = par.clientWidth;
																	document.getElementById(dropMenu.id).style.paddingLeft = "5";
																	document.getElementById(dropMenu.id).style.zindex = "2";
																	document.getElementById(dropMenu.id).style.background = "linear-gradient(lightgray, white)";
																	document.getElementById(this.id).style.height = "20px";
																	document.getElementById(this.id).style.width = 47;
																	this.showFlag = true;
																}
																else
																{
																	document.getElementById(dropMenu.id).style.display = "none"; 
																	this.showFlag = false;
																}
															}
														 }
											, false);
			}
				
			document.getElementById(parent).appendChild(con);
			
			if(document.getElementById(this.id) != null)
				document.getElementById(this.id).appendChild(dropMenu);


			if(this.children.length > 0)
			{
				for(var i = 0; i!= this.children.length; i++)
				{
					this.children[i].addSelfTo(this.dropId, i);
				}
			}
			
			this.width = document.getElementById(this.id).clientWidth;
			console.log(this.width);
		}
	}
	
	this.addMouseOverListener = function(toDo)
	{
		this.mouseOverListener = toDo;
		if(document.getElementById(this.id) != null)
		{
			var element = document.getElementById(this.id);
			element.addEventListener('mouseover', this.defaultMouseInBehavior + toDo);
		}
	}
	
	this.addMouseOutListener = function(toDo)
	{
		this.mouseOutListener = toDo;
		if(document.getElementById(this.id) != null)
		{
			var element = document.getElementById(this.id);
			element.addEventListener('mouseout', toDo);
		}
	}
	
	this.addmouseClickListener = function(toDo)
	{
		this.mouseClickListener = toDo;
		if(document.getElementById(this.id) != null)
		{
			var element = document.getElementById(this.id);
			element.addEventListener('click', toDo);
		}
	}
	
	this.getLabel = function()
	{
		if(document.getElementById(this.id))
			return document.getElementById(this.id).innerHTML;
		else 
			return this.label;
	}
	
	this.setColor = function(color)
	{
		this.color = color;
		if(document.getElementById(this.id) != null)
			document.getElementById(this.id).style.color = this.color;
alert(color);		
	}
	
	this.setOutline = function(border)
	{
		this.border = border;
		if(document.getElementById(this.id) != null)
			document.getElementById(this.id).style.outline = this.border;	
	}
	
	this.setLabel = function(label)
	{
		this.label = label;
		if(document.getElementById(this.id) != null)
			document.getElementById(this.id).innerHTML = this.label;	
	}
	
	this.setBackground = function(color)
	{
		this.background = color;
		if(document.getElementById(this.id) != null)
			document.getElementById(this.id).style.background = this.background;	
	}
}
