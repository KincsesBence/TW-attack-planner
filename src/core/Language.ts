import { en } from "../view/language/en";
import { hu } from "../view/language/hu";
export function Lang(text:string){
    let base:any=hu;
    switch(window.Lang){
        case 'hu':
            base=hu
        break;
        case 'en':
            base=en
        break;
    }
    if(base.hasOwnProperty(text)){
        return base[text];
    }else{
        return `lang.${window.Lang}.${text}`;
    }
    
}

export function getLangFormat(){
    switch(window.Lang){
        case 'hu':
            return 'hu-HU'
        case 'en':
            return 'en-US'
    }

}

export function determineLang(){
    const langSupported=['hu','en'];
    const navigatorLang=navigator.language.split('-')[0];

    if(!langSupported.includes(navigatorLang)){
        return 'en'
    }

    return navigatorLang;
}