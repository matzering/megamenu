/**
 *  Mootools Drop-Down Menü aka MooMenu
 *  basiert auf Standard CSS DropDown mit Fallback
 *
 *  Erläuterung:
 *  Es wird ein ganz normales Drop-Down-Menu mit CSS erstellt.
 *  Durch das Einbinden der MooMenu - Klasse wird das Menü animiert.
 *
 *  Die margins des animierten Objekts werden auf 0 gesetzt. Im Falle
 *  eines Grid-Systems kann der Außenabstand mittels padding wieder hergestellt
 *  werden.
 *
 *  Optionen:
 *  element : die ID der mod_navigation
 *  mode    : fade oder drop
 *  MooIn   : siehe Mootools Fx
 *  MooOut  : siehe Mootools Fx
 *  duration: Angabe in ms
 *
 *  (c) Oliver Lohoff, www.contao4you.de
 *  LGPL 3.0
 */

var MooMenu = new Class({

  Implements : Options,
    options: {
        mode : 'drop',  // or 'fade'
        MooIn : 'bounce:out',
        MooOut : 'circ:out',
        durationin : '1000',
        durationout : '200'
    },

  initialize: function(options){
    this.setOptions(options);
    var id = $(this.options.element);
      this.elements = $(id).getElements('li.submenu');
    this.attach(this.options.mode, this.options.MooIn, this.options.MooOut, this.options.durationin, this.options.durationout);
  },

    attach: function(mode, MooIn, MooOut, durationin, durationout){
    this.elements.each(function(element, index) {
        var obj;
        if (element.getElement('div')) obj=element.getElement('div'); else obj=element.getElement('ul');
        if (mode == 'drop') {
            var div = new Element('div').wraps(obj);
            div.addClass('wrapper');
            obj.setStyle('top', -obj.offsetHeight);
            div.setStyle('height', obj.offsetHeight);
            div.setStyle('width', obj.offsetWidth);
        } else {
           obj.set('opacity', 0);
           obj.addClass('fade');
        }
        var aktiv = false;
        element.addEvents({
            mouseenter: function(e){
                switch (mode) {
                  case 'drop' :
                        if (!this.aktiv)
                        {
                            this.aktiv = true;
                            div.addClass('drop');
                            obj
                             .set('tween',{ transition: MooIn, duration: durationin })
                             .tween('top', 0);
                        }
                        break;
                  case 'fade' :
                  		obj.setStyle('opacity', 0);
                  		obj.setStyle('visibility', 'visible');
                        obj
                          .set('tween', { transition: MooIn, duration: durationin })
                          .tween('opacity', 1);
                        break;
                }
            },
            mouseleave: function(e){
                switch (mode) {
                case ('drop') :
                        if (this.aktiv)
                        {
                            var myFx = new Fx.Tween (obj, { transition: MooOut,
                                        duration: durationout,
                                        property:'top'
                                      });
                            myFx.start(-obj.offsetHeight).chain(function(){
                                div.removeClass('drop');
                            });
                            this.aktiv = false;
                        }
                     break;
                case ('fade') :
                    obj.setStyle('opacity', 1);
                    obj
                      .set('tween', { transition: MooOut, duration: durationout})
                      .tween('opacity', 0);
                    obj.setStyle('visibility', 'hidden');
                    break;
                }
            }
        });

    }, this);

    return this;
}
 
});