"use strict";

/**
 * Apply plugin to all autocomplete fields.
 */
$('.gdo-autocomplete-input').each(function(){
	var $this = $(this);
	var config = $this.attr('data-config');
	config = JSON.parse(config);
	var hiddenID = 'completion-'+config.name;
	var $hidden = $('#'+hiddenID);
	// if this input has a name, we need to switch names with the hidden input that holds the selected ID.
	var name = $this.attr('name');
	if (name) { 
		$this.removeAttr('name');
		$hidden.attr('name', name);
	}
	$this.attr('placeholder', config.emptyLabel);
	$hidden.val(config.selected.id);
	$('#nocompletion_' + config.name).val('0');

	if (config.selected) {
		if (config.multiple) {
			console.error('MULTIPLE COMPLETION NOT SUPPORTED YET.');
		} else {
			if (config.selected.id !== config.emptyVar) {
				$this.val(config.selected.text);
			} else {
				$this.val('');
			}
		}
	}
	var options = {
		url: function (query) {
			return config.completionHref + '&_fmt=json&query=' + query;
		},
		listLocation: function (data) {
			return data.data||[];
		},
		getValue: 'text',
		requestDelay: 500,
		minCharNumber: Math.max([2, config.min]),
		placeholder: $(this).attr('placeholder'),
	    template: {
	        type: "custom",
	        method: function(value, item) {
	        	return item.display;
	        }
	    },
//		theme: 'round',
	    list: {
			maxNumberOfElements: 20,
			onChooseEvent: function() {
	            var selectedItemValue = $this.getSelectedItemData().id;
	            $('#nocompletion_' + config.name).val(0);
	            $hidden.val(selectedItemValue);
	            $this.focus();
	        },
	    }
	};

	/**
	 * On enter, check if the list is closed. if it is closed, submit the form.
	 */
	$this.keydown(function(event) {
		if (event.keyCode === 13) {
			var $eaccul = $('#eac-container-'+config.name+' ul');
			if ($eaccul.css('display') === 'none') {
        		$this.closest('form').find('input[type=submit]:first').click();
			}
			else {
				event.preventDefault();
			}
		}
		
//		if (config.combobox) {
			setTimeout(function(){
	            $('#nocompletion_' + config.name).val(1);
	            $hidden.val($this.val());
			});
//		}
	});
	
	$this.easyAutocomplete(options);
	
	$this.parent().css('width', 'auto'); // fix bad width patch from lib.
});
