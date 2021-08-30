let bill_amount_input_container = document.querySelector('.bill-amount-input-container');
let payed_amount_input_container = document.querySelector('.payed-amount-input-container');
let Denomination_amount_input_container = document.querySelector('.denomination-amount-input-container');
let availableDenomination_table = document.querySelector('.available-denomination');
let final_message_container = document.querySelector('.final-message-container');
let final_message = document.querySelector('.final-message');


let bill_amount_input = document.querySelector('.bill-amount-input');
let payed_amount_input = document.querySelector('.payed-amount-input');

let bill_amount_add = document.querySelector('.bill-amount');
let payed_amount_add = document.querySelector('.payed-amount');
let denomination_add = document.querySelector('.denomination-add');

let denoArrayInput = document.querySelectorAll('.deno');

let bill_amount_entered;
let payed_amount_entered;
let Denomination_amount_payed =0;

let availableDenomination = [0,0,0,0,0,0,1,1,1,1];
let DenominationArray=[];
let DenominationSum =0;
let balance_amount ;
let currency = [2000,500,200,100,50,20,10,5,2,1];
let balance_Denomination = [0,0,0,0,0,0,0,0,0,0];
let b;
let q;
let mandate=0;
function availableDenominationTable ()
{
    availableDenomination_table.innerHTML =
            
                    `<tr>
                            <th>Denomination</th>
                            <td>₹2000</td>
                            <td>₹500</td>
                            <td>₹200</td>
                            <td>₹100</td>
                            <td>₹50</td>
                            <td>₹20</td>
                            <td>₹10</td>
                            <td>₹5</td>
                            <td>₹2</td>
                            <td>₹1</td>
                    </tr>
                    <tr>
                        <th>Ava. Count</th>
                        <td>${availableDenomination[0]}</td>
                        <td>${availableDenomination[1]}</td>
                        <td>${availableDenomination[2]}</td>
                        <td>${availableDenomination[3]}</td>
                        <td>${availableDenomination[4]}</td>
                        <td>${availableDenomination[5]}</td>
                        <td>${availableDenomination[6]}</td>
                        <td>${availableDenomination[7]}</td>
                        <td>${availableDenomination[8]}</td>
                        <td>${availableDenomination[9]}</td>
                    </tr>`;

};

availableDenominationTable ();

    bill_amount_add.addEventListener ('click',(e) => {
        e.preventDefault();
            if(bill_amount_input.value != '')
            {
                document.querySelector('#small-bill').className = "small";
                bill_amount_entered = parseInt(bill_amount_input.value);
                
                bill_amount_input_container.classList.add("input-container-item-hidden");
                payed_amount_input_container.classList.remove("input-container-item-hidden");
                
            }
            else
            {
                    document.querySelector('#small-bill').className = "smart";
            }
    });

    payed_amount_add.addEventListener('click',(e) =>{
        e.preventDefault();
            if(payed_amount_input.value != '')
            {
                
                document.querySelector('#small-payed').className = "small";
                payed_amount_entered = parseInt( payed_amount_input.value);

                if(payed_amount_entered >= bill_amount_entered)
                {
                    payed_amount_input_container.classList.add("input-container-item-hidden");
                    Denomination_amount_input_container.classList.remove("input-container-item-hidden");
                    b = payed_amount_entered - bill_amount_entered;
                }
                else{

                    document.querySelector('#small-payed').innerHTML = "Payed amount is less than billed amount";
                    document.querySelector('#small-payed').className = "smart";
                }
                
            }
            else
            {
                     document.querySelector('#small-payed').innerHTML = "It's a required field";
                     document.querySelector('#small-payed').className = "smart";

            }
        });

    denomination_add.addEventListener('click',(e)=>{
           
            DenominationSum =0;
            DenominationArray =[];
            
           
           
            
            denoArrayInput.forEach(DenominationCheck);
            DenominationArray.forEach(sumPayed);
        
            
            
            if(DenominationSum != payed_amount_entered)
            {
                document.querySelector('#denomination-message').innerHTML ='The entered denomination sum is not equal to payed amount' ;
                document.querySelector('#denomination-message').className = "smart";
            }
            else
            {
                document.querySelector('#denomination-message').innerHTML ="It's a required field" ;
                document.querySelector('#denomination-message').className = "small";
                denoArrayInput.forEach(payedPlusAvailableDenomination);
                availableDenominationTable ();
                balance_amount = b;
                
                for(i=0; i<10;i++)
                {
                    if(balance_amount != balance_amount % currency[i])
                    {
                        
                        if(balance_amount % currency[i] == 0 )
                        {
                       
                            q = Math.floor(balance_amount/currency[i]);
                            
                            if(availableDenomination[i]>= q)
                            {
                                 balance_Denomination[i]= q;
                                 balance_amount = 0;
                            }
                            else
                            {
                                 balance_amount = balance_amount - availableDenomination[i]*currency[i];
                                 balance_Denomination[i] = availableDenomination[i];
                                 
                            }
                        }
                        else
                        {
                             q = Math.floor(balance_amount/currency[i]); 
                             if(availableDenomination[i]>= q)
                            {
                                 balance_Denomination[i]= q;
                                 balance_amount = balance_amount % currency[i];
                            }
                            else
                            {
                                 balance_amount = balance_amount - availableDenomination[i]*currency[i];
                                 balance_Denomination[i]= availableDenomination[i];
                            }
                               

                        }
                    }
                   
                }
                for(i=0; i<10;i++)
                {
                    availableDenomination[i] = availableDenomination[i]- balance_Denomination[i];
                }
                availableDenominationTable ();
                Denomination_amount_input_container.classList.add("input-container-item-hidden");
                final_message_container.classList.remove("input-container-item-hidden");
                if(balance_amount !=0)
                {
                    final_message.innerHTML = `Sorry no Change, Please provide exact change`;

                }
                else
                {
                            
                    final_message.innerHTML = `Please provide the change of ₹${b} and in the Denomination as below 
                    <br>
                    <div class="balance-denomination">
                        ₹ ${currency[0]} x ${balance_Denomination[0]},<br>
                        ₹ ${currency[1]} x ${balance_Denomination[1]}, <br>₹ ${currency[2]} x ${balance_Denomination[2]},<br>
                        ₹ ${currency[3]} x ${balance_Denomination[3]},<br>₹ ${currency[4]} x ${balance_Denomination[4]},<br>
                        ₹ ${currency[5]} x ${balance_Denomination[5]},<br>₹ ${currency[6]} x ${balance_Denomination[6]},<br>
                        ₹ ${currency[7]} x ${balance_Denomination[7]},<br>₹ ${currency[8]} x ${balance_Denomination[8]}, and <br>
                        ₹ ${currency[9]} x ${balance_Denomination[9]}
                        </div>`;
                }
                
                
            }
           
           
                
        });

function mandatoryCheck(element){
    if(element.value ='')
    {
        mandate++;
    }

};
    
function DenominationCheck(element)
{
     if(element.value!='')
     {
         
        switch(element.id)
        {
            case "2000":
                DenominationArray[0] =parseInt(element.value)*2000;
                break;
            case "500":
                DenominationArray[1] = parseInt(element.value)*500;
                break; 
            case "200":
                DenominationArray[2] =parseInt(element.value)*200;
                break;
            case "100":
                DenominationArray[3] =parseInt(element.value)*100;
                break;
            case "50":
                DenominationArray[4] =parseInt(element.value)*50;
                break;  
            case "20":
                DenominationArray[5] =parseInt(element.value)*20;
                break;
            case "10":
                DenominationArray[6] =parseInt(element.value)*10;
                break;
            case "5":
                DenominationArray[7] =parseInt(element.value)*5;
                break;
            case "2":
                DenominationArray[8] =parseInt(element.value)*2;
                break;
            case "1":
                DenominationArray[9] =parseInt(element.value)*1;
                break;
            default:
                break; 

        }
       
       
     }
     else
        
     {
        switch(element.id)
        {
            case "2000":
                DenominationArray[0] = 0;
                break;
            case "500":
                DenominationArray[1] = 0;
                break; 
            case "200":
                DenominationArray[2] = 0;
                break;
            case "100":
                DenominationArray[3] = 0;
                break;
            case "50":
                DenominationArray[4] = 0;
                break;  
            case "20":
                DenominationArray[5] = 0;
                break;
            case "10":
                DenominationArray[6] = 0;
                break;
            case "5":
                DenominationArray[7] = 0;
                break;
            case "2":
                DenominationArray[8] = 0;
                break;
            case "1":
                DenominationArray[9] = 0;
                break;
            default:
                break; 

        }  
     }

};

function sumPayed(denomination){

    DenominationSum = DenominationSum + denomination;
};


function payedPlusAvailableDenomination(element)
{
    if(element.value !='')
    {
        switch(element.id)
            {
                case "2000":
                    availableDenomination[0]= availableDenomination[0]+ parseInt(element.value);
                    break;
                case "500":
                    availableDenomination[1]= availableDenomination[1]+ parseInt(element.value);
                    break; 
                case "200":
                    availableDenomination[2]= availableDenomination[2]+ parseInt(element.value);
                    break;
                case "100":
                    availableDenomination[3]= availableDenomination[3]+ parseInt(element.value);
                    break;
                case "50":
                    availableDenomination[4]= availableDenomination[4]+ parseInt(element.value);
                    break;  
                case "20":
                    availableDenomination[5]= availableDenomination[5]+ parseInt(element.value);
                    break;
                case "10":
                    availableDenomination[6]= availableDenomination[6]+ parseInt(element.value);
                    break;
                case "5":
                    availableDenomination[7]= availableDenomination[7]+ parseInt(element.value);
                    break;
                case "2":
                    availableDenomination[8]= availableDenomination[8]+ parseInt(element.value);
                    break;
                case "1":
                    availableDenomination[9]= availableDenomination[9]+ parseInt(element.value);
                    break;
                default:
                    break;
            }
    }
    
};
