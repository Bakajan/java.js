function MenuItem(label)
{
	this.label = label;
	this.background;
	this.display = "inline-block";
	this.padding = "5px";
	this.outline;
	this.textColor = "black";
	this.overTextColor = "white";
	this.id = 'menuItem';
	this.mouseOverListener;
	this.mouseOutListener;
	this.mouseClickListener;
	this.defaultClick;
	this.elementType;
	this.children = [];
	this.focusHighlightColor = "";
	this.defaultColor = "";
	this.mouseOverBorder = "outset white";
	this.mouseOverBackground = "transparent";
	this.mouseOutBorder = "none";
	this.mouseOutBackground = "transparent";
	
	this.dropId;
	this.dropBorder = "1px gray solid";
	this.dropBackground = "linear-gradient(lightgray, white)";
	this.showFlag = false;
	this.Parentwidth;

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
		dropMenu.style.border = "2px outset white";
		dropMenu.style.background = this.dropBackground;
		dropMenu.style.marginLeft = "-5px";
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
			
			
				
			document.getElementById(parent).appendChild(con);
			
			if(document.getElementById(this.id) != null)
				document.getElementById(this.id).appendChild(dropMenu);

			/// Children adding thier children before adding themselves ////////////////
			if(this.children.length > 0)
			{
				for(var i = 0; i!= this.children.length; i++)
				{
					this.children[i].addSelfTo(this.dropId, this.dropId + i);
				}
			}
			
			//////////// Setup Drop Down Menu /////////////////////////////
			if(document.getElementById(dropMenu.id).childNodes.length > 0)
			{
				var width = document.getElementById(this.id);
				document.getElementById(this.id).style.zindex = "2";
				
				var el = document.getElementById(dropMenu.id).childNodes[0];
				var wid;
				for(var i =0; i != document.getElementById(dropMenu.id).childNodes.length; i++)
				{
					if(document.getElementById(dropMenu.id).childNodes[i].clientWidth > wid)
						wid = document.getElementById(dropMenu.id).childNodes[i].clientWidth + 10;
					document.getElementById(dropMenu.id).childNodes[i].style.marginLeft = "5";
					document.getElementById(dropMenu.id).childNodes[i].style.textAlign = "left";
				}

				document.getElementById(dropMenu.id).style.height = el.clientHeight* (document.getElementById(dropMenu.id).childNodes.length *2);
				if(el.clientWidth > wid)
					document.getElementById(dropMenu.id).style.width = el.clientWidth + 100;
				else
					document.getElementById(dropMenu.id).style.width = wid + 100;
				document.getElementById(dropMenu.id).style.paddingRight = "10px";
				document.getElementById(dropMenu.id).style.zindex = "1";
				document.getElementById(dropMenu.id).style.background = this.dropBackground;
			}
			
			///// Add Listeners /////////////////////////////////////
			if(this.mouseOverListener != null)
				con.addEventListener('mouseover', this.mouseOverListener, false);
			else
			{
				var overColor = this.mouseOverBackground;
				var overTextColor = this.overTextColor;
				con.addEventListener('mouseenter', 
				function() 
				{ 
					this.border = this.mouseOverBorder;
					if(document.getElementById(this.id) != null)
					{
						document.getElementById(this.id).style.outline = this.border; 
						document.getElementById(this.id).style.background = overColor; 
						document.getElementById(this.id).style.color = overTextColor; 
					}
				}, false);
			}
			if(this.mouseOutListener != null)
				con.addEventListener('mouseleave', this.mouseOutListener, false);
			else
			{
				var outColor = this.mouseOutBackground;
				var textColor = this.textColor;
				this.border = this.mouseOutBorder;
				con.addEventListener('mouseleave', 
				function() 
				{ 
					document.getElementById(this.id).style.outline = this.border;
					document.getElementById(this.id).style.background = outColor;
					document.getElementById(this.id).style.color = textColor;
					document.getElementById(dropMenu.id).style.display = "none"; 
					this.showFlag = false;				
				}
				, false);
			}
			if(this.mouseClickListener != null)
				con.addEventListener('click', this.mouseClickListener, false);
			else
			{
				this.defaultClick = function() 
				{ 
					console.log("default start");
					if(document.getElementById(dropMenu.id) != null)
					{
						if(!this.showFlag)
						{
							var width = document.getElementById(this.id);						
							var el = document.getElementById(dropMenu.id).childNodes[0];
							var wid;
							document.getElementById(dropMenu.id).style.position = "absolute";
							document.getElementById(dropMenu.id).style.display = "block";
							document.getElementById(dropMenu.id).style.height = el.clientHeight* (document.getElementById(dropMenu.id).childNodes.length *2);
							if(el.clientWidth > wid)
								document.getElementById(dropMenu.id).style.width = el.clientWidth + 100;
							else
								document.getElementById(dropMenu.id).style.width = wid + 100;

							this.showFlag = true;
						}
						else
						{
							document.getElementById(dropMenu.id).style.display = "none"; 
							this.showFlag = false;
						}
					}
				 }
				con.addEventListener('click', this.defaultClick, false);
			}
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
	
	this.setMouseOverBorder = function(color)
	{
		this.mouseOverBorder = color;	
	}
	
	this.setMouseOutBorder = function(color)
	{
		this.mouseOutBorder = color;	
	}
	
	this.setMouseOverBackground = function(color)
	{
		this.mouseOverBackground = color;	
	}
	
	this.setMouseOutBackground = function(color)
	{
		this.mouseOutBackground = color;	
	}
	
	this.setMouseOverTextColor = function(color)
	{
		this.overTextColor = color;	
	}
	
	this.setTextColor = function(color)
	{
		this.textColor = color;	
	}
	
	this.setBackground = function(color)
	{
		this.background = color;
		if(document.getElementById(this.id) != null)
			document.getElementById(this.id).style.background = this.background;	
	}
	
	this.setDropMenuBackground = function(color)
	{
		this.dropBackground = color;
		var dropId = this.dropId;
		if(document.getElementById(this.id) != null)
		{
			if(document.getElementById(dropId) != null)
				document.getElementById(dropId).style.background = this.dropBackground;
		}
	}
}
