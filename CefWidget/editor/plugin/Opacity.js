  function setOpacity(ele, opacity) { 
            if (ele.style.opacity != undefined) { 
            ///兼容FF和GG和新版本IE 
            ele.style.opacity = opacity / 100; 

            } else { 
            ///兼容老版本ie 
            ele.style.filter = "alpha(opacity=" + opacity + ")"; 
            } 
            } 
             
            function fadeout(ele,speed) { 
                
                if (ele) { 
                     var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity || 100;  
                    timer = setInterval(function() {  
                        if (v  > 0) {  
                            v -= 1/(speed/1000);  
                            setOpacity(ele, v);  
                        } else {  
                            clearInterval(timer);  
                        }  
                    }, 0);  
                } 
            } 

            
            var bar = new ProgressBar.Line(logo_SVG, { 
              strokeWidth: 4,
              easing: 'easeInOut',
              duration: 1000,
              color: '#FFEA82',
              trailColor: '#eee',
              trailWidth: 1,
              svgStyle: {width: '100%', height: '50%'},
              text: {
                style: {
                  color: '#eee',
                  position: 'absolute',
                  right: '45%',
                  top: '75%',
                  padding: '5px',
                  margin: 0,
                  transform: null
                },
                autoStyleContainer: false
              },
              from: {color: '#FFEA82'},
              to: {color: '#1d815e'},
              step: (state, bar) => {
                bar.path.setAttribute('stroke', state.color);
                bar.setText(Math.round(bar.value() * 100) + ' %');
              }
            });
            
            var delay_time = 0; 
            
            bar.animate(.57);
            
            setTimeout("bar.animate(1)",delay_time);
            setTimeout("fadeout(document.getElementById('logo_SVG'), 1000);fadeout(document.getElementById('background_block'), 1000);",delay_time + 1000);
            
            setTimeout("document.getElementById('del').removeChild(document.getElementById('logo_SVG')); document.getElementById('del').removeChild(document.getElementById('background_block'));",delay_time + 2000);