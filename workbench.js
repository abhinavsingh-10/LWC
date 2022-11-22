import { LightningElement,track,api } from "lwc";
import objlisttt from "@salesforce/apex/objlisttt.getAllObjectList";
import getFields from "@salesforce/apex/objlisttt.getFields";

export default class objpicklist extends LightningElement
{
            
    @track objectList = [];
    @track lstOfPicklistFields= [];
    @track ObjectName;
    @track Fields;
    @track query;

    connectedCallback() { 
        objlisttt()
        .then((result) => {
            if (result) {
                console.log('result===>>>',result);
                this.objectList = [];
                for (let key in result ) {
                    this.objectList.push({ label: key, value: key });
                }
            } else {
                console.log('Error in getting objects ')
            }
        }).catch((error) => {
            console.log('Catch Error in getting objects' + error)
        })
    }

    handleObject(event){
        this.ObjectName=event.detail.value;
        console.log('Obj Name: '+this.ObjectName);
        getFields({strObjectName: this.ObjectName})
        .then((result)=> {
            console.log('Field Result: '+result);
            this.lstOfPicklistFields =[];
            for (let key in result){
                console.log('Key: '+key);
                this.lstOfPicklistFields.push({ label: result[key], value: result[key] });

            }
            console.log('lstOfPicklistFields==>',this.lstOfPicklistFields);
            
        }).catch((error) => {
            console.log('Catch Error in getting objects' + error)
        })
        
        }

        handleFieldValues(event){
            console.log('Select fields'+event.detail.value);
            this.Fields = event.detail.value;
        }

        genratequery(){

            this.query = 'Select '+ this.Fields+ ' From ' + this.ObjectName;    

        }

       
        

}
    
