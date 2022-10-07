<?php
namespace GDO\JQueryAutocomplete;

use GDO\Core\GDO_Module;
use GDO\Core\GDT_Array;

/**
 * EasyAutocomplete wrapper module.
 * 
 * @link https://github.com/pawelczak/EasyAutocomplete
 * 
 * @author gizmore
 * @version 7.0.1
 * @since 6.10.0
 */
final class Module_JQueryAutocomplete extends GDO_Module
{
    public int $priority = 45;
    public string $license = 'MIT';
    
    public function getDependencies() : array
    {
    	return ['JQuery'];
    }
    
    public function thirdPartyFolders() : array
    {
    	return ['EasyAutocomplete/'];
    }
    
    public function getLicenseFilenames() : array
    {
    	return [
    		'MIT.LICENSE',
    		'EasyAutocomplete/LICENSE.txt',
    	];
    }
    
    public function onIncludeScripts() : void
    {
        $min = $this->cfgMinAppend();
        $this->addCSS("EasyAutocomplete/dist/easy-autocomplete{$min}.css");
        $this->addCSS("EasyAutocomplete/dist/easy-autocomplete.themes{$min}.css");
        $this->addJS("EasyAutocomplete/dist/jquery.easy-autocomplete{$min}.js");
        $this->addJS("js/gdo7-easy-autocomplete.js");
    }
    
}
