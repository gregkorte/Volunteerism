document.addEventListener('DOMContentLoaded', function(){
  var $button = document.querySelector('button');

  $button.addEventListener('click', function(){
      var $target = document.querySelector('target');
      var studentList = ["item1", "item2" ,"item3" ,"item4" ,"item5" ,"item6" ,"item7"];
      var randomReturn = studentList[Math.floor(Math.random() * studentList.length)];
      // var docFragment = createPTag();
      // $target.appendChild(docFragment);
      alert(randomReturn);
  });

});

function selectorMethod(){
    var $option = document.querySelector("selector").selectedIndex;

 	if ($option === 'random'){
 	    alert("This is the random list")};
 		else if ($option === 'neighborPairing'){
 			alert('This is the neighbor pairing list')};
 		else if ($option === 'teamsOf3'){
 			alert('This is the teams of 3 list')};
 		else if ($option === 'randomPairing'){
 			alert('This is the random pairing list')};
 		else if ($option === 'randomNPairing'){
 			alert('This is the random n pairing list')};
};




// function createPTag(){
//    var docFragment = document.createDocumentFragment();
//    var $div = document.createElement('div');

//    div$setAttribute('class', 'myClass');
//    var $p = document.createElement('p');
//    $div.appendChild($p);
//    $p.textContent = 'Hi';
//    docFragment.appendChild($div);

//    return docFragment;
// };