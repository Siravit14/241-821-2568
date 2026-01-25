function submitData(){
    let fristNameDOM = document.querySelector('input[name=fristname]');
    let lastnameDom = document.querySelector('input[name=lastname]');
    let ageDom = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked');
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked');
    let descriptionDOM = document.querySelector('textarea[name=description]');

    let interest = ''
    for (let i = 0; i<interestDOMs.length;i++){
        interest+=interestDOMs[i].value
        if (i != interestDOMs.length-1){
            interest += ','
        }
    }
    let userData ={
        fristName: fristNameDOM.value,
        lastnameDom: lastnameDom.value,
        age: ageDom.value,
        gender: genderDOM.value,
        description: descriptionDOM.value,
        interest: interest
    }
    console.log('submitData',userData);
}