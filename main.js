var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

// constructor cho các form
function Validator(options){
    var selectorRules ={}; 
    var formElement = $(options.form);
   

  

   
    options.rules.forEach(function(rule){ 
      
        var inputElement = $(rule.selector);
        // thêm nhiều rule cho một phần tử
        if (Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule);
        }else {
            selectorRules[rule.selector] = [rule];

        }
       
                // xử lí khi click vào nút submit
               
             
        // khi blur
        inputElement.onblur = function () {
            var errorValue;
            var rules1 =  selectorRules[rule.selector];
            console.log(rules1)
            for ( var i = 0; i < rules1.length ; i++ ){
                 errorValue = rules1[i].test(inputElement.value);
                if ( errorValue ) {
                    break;
                }
            }


           if ( errorValue ) {
           
            inputElement.parentElement.classList.add('invalid');
            inputElement.parentElement.querySelector('.form-message').innerText = errorValue;
           } else {
           
            inputElement.parentElement.classList.remove('invalid');
            inputElement.parentElement.querySelector('.form-message').innerText = '';
           }
        }
            // khi trong ô
        inputElement.oninput = function() {
            inputElement.parentElement.classList.remove('invalid');
            inputElement.parentElement.querySelector('.form-message').innerText = '';

        }
        

       
    })

      // submit
      formElement.onsubmit = function (e) {
        e.preventDefault();
        var isFull = true ;
        options.rules.forEach(function(rule){ 
            var inputElement = $(rule.selector);
               var errorValue = rule.test(inputElement.value)   
               if ( errorValue ) {
                isFull = false;
                inputElement.parentElement.classList.add('invalid');
                inputElement.parentElement.querySelector('.form-message').innerText = errorValue;
               } else {
                inputElement.parentElement.classList.remove('invalid');
                inputElement.parentElement.querySelector('.form-message').innerText = '';
               }
               


        } )
         // lấy dữ liệu values = {}
         if ( isFull) {
                var formSubmit = formElement.querySelectorAll('[name]');
                var data = Array.from(formSubmit).reduce (function(values,input) {
                    values[input.name] = input.value;
                    return values;
                },{}) 
                options.submit(data);
                    
        } 
    }
 
        
    
}

// xử lí form bắt buộc
function isRequired(selector) {
    
    return {
        selector,
        test(value) {
            return value ? undefined : 'Vui lòng nhập trường này';
           
        }
    }
}

// xử lí form phải là email

function isEmail(selector){
  
    return {
        selector,
        test(value) {
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email hợp lệ';
           
        }
    
    }
}


// xử lí form phải là Password
function isPassWord(selector , minPass) {
    
    return {
        selector,
        test(value) {
            return value.length >= minPass ? undefined : 'Vui lòng nhập mật khẩu trên 6 kí tự';
          
        }
       
        
    
    }
}


// xử lí form phải là xác nhận Password


function isPassWord_Confirm(selector,getPassWord) {
    
    return {
        selector,
        test(value) {
            return value === getPassWord() ? undefined : 'Xác nhận lại mật khẩu chưa đúng';
           
        }
       
        
    
    }
}

