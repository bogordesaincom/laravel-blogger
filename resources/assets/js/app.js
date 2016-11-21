import $ from 'jquery';
window.$ = window.jQuery = $;
import toastr from 'toastr';
window.toastr = toastr;

import Scroller from './libs/Scroller';
import SocialShare from './libs/SocialShare';
import ContactForm from './libs/ContactForm';
import lazyload from 'jquery-lazyload';
import ShowPassword from './libs/ShowPassword';
import Flatpickr from 'Flatpickr';

import List from 'list.js';
import ListPagination from './libs/list.pagination';

toastr.options = {
  closeButton : true,
  timeOut : 5000,
  positionClass: "toast-top-center"
}


$(document).ready(function() {


$('.form-delete-user').submit(function(){

  if(!confirm('Do you really want to delete this user?')){
     return false;
  }
});

$('.form-delete-category').submit(function(){

  if(!confirm('Do you really want to delete this category and all related articles?')){
     return false;
  }
});

$('.form-delete-tag').submit(function(){

  if(!confirm('Do you really want to delete this tag and all related articles?')){
     return false;
  }
});

function convertToSlug(text)
{
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}

function updateDisplayName(){
  let newValue = $('#first_name').val().trim() +" "+$('#last_name').val().trim();
  $('#display_name').attr('value',  newValue);
}

function updateCategorySlug(){
  let name = $('#category-name').val().trim();
  let newValue = (name)? convertToSlug(name) : "";
  $('#category-slug').attr('value', newValue);
}

function updateTagSlug(){
  let name = $('#tag-name').val().trim();
  let newValue = (name)? convertToSlug(name) : "";
  $('#tag-slug').attr('value', newValue);
}


$('#first_name').change(() => {
  updateDisplayName();
});

$('#last_name').change(() => {
  updateDisplayName();
});

$('#category-name').change(() => {
  updateCategorySlug();
});


$(".date-of-birth").flatpickr({
    maxDate: new Date(),
});


  var topPaginationOptions = {
    paginationClass: "top-list-pagination",
    outerWindow: 1,
    innerWindow: 1,
  };
  var bottomPaginationOptions = {
    paginationClass: "bottom-list-pagination",
    outerWindow: 1,
     innerWindow: 1,
  };

var userOptions = {
  valueNames: [ 
    'user-table-id',
    'user-table-avatar',
    'user-table-role',
    'user-table-email',
    'user-table-display-name',
    'user-table-created-at',
  ],
  page: 5,
  item: "user-table-no-results",
  plugins: [
    ListPagination(topPaginationOptions),
    ListPagination(bottomPaginationOptions)
  ]
};
var userTableList = new List('user-table-list', userOptions);

var categoryOptions = {
  valueNames: [ 
    'category-table-id',
    'category-table-name',
    'category-table-articles-count',
    'category-table-email',
    'category-table-created-at',
  ],
  page: 5,
  item: "category-table-no-results",
  plugins: [
    ListPagination(topPaginationOptions),
    ListPagination(bottomPaginationOptions)
  ]
};
var categoryTableList = new List('category-table-list', categoryOptions);

var categoryOptions = {
  valueNames: [ 
    'tag-table-id',
    'tag-table-name',
    'tag-table-articles-count',
    'tag-table-email',
    'tag-table-created-at',
  ],
  page: 5,
  item: "tag-table-no-results",
  plugins: [
    ListPagination(topPaginationOptions),
    ListPagination(bottomPaginationOptions)
  ]
};
var tagTableList = new List('tag-table-list', categoryOptions);


$('#user-list-search').keyup(function(){
  let needle = $(this).val();
  userTableList.search(needle);
});


$('#category-list-search').keyup(function(){
  let needle = $(this).val();
  categoryTableList.search(needle);
});

$('#tag-list-search').keyup(function(){
  let needle = $(this).val();
  tagTableList.search(needle);
});



if (window.location.hash == '#_=_'){
  
    history.replaceState 
        ? history.replaceState(null, null, window.location.href.split('#')[0])
        : window.location.hash = '';
}
(new Scroller).init('.scroller');

ContactForm.init('#contact-form-trigger');
ShowPassword.init('.show-password','.show-password-field');
ShowPassword.init('.show-new-password','.show-new-password-field');
ShowPassword.init('.show-new-password-confirmation','.show-new-password-confirmation-field');



SocialShare.init("id",{
  title:'This is the email subject and/or tweet text',
  url:  'http://rrssb.ml/',
  // optional:
  description:  'Longer description used with some providers',
  emailBody:  'Usually email body is just the description + url, but you can customize it if you want'
});

$('.ui.checkbox').checkbox();

$('.ui.dropdown').dropdown();
$('.left.sidebar').first().sidebar('attach events', '.sidebar-trigger');

$('.ui.search')
  .search({
    apiSettings: {
      url: '/autocomplete/?q={query}'
    },
    type: 'standard'
  })
;
//initialize placeholders for lazy loading$("img.lazy").lazyload({




$("img.lazy.ui.fluid").show().lazyload({effect : "fadeIn",threshold : 500});
// $('img.image')
//   .visibility({
//     type       : 'image',
//     transition : 'fade in',
//     duration   : 1000
//   })
// ;

$('.favorite').popup();

$('.favorite').click(function(){
  var star = $(this).children().first();

  if($(this).children().first().hasClass('yellow active')){
    star.removeClass('yellow active');
    toastr.success("Removed from favourite articles");
  }else{
    star.addClass('yellow active');
    toastr.success("Added to favourite articles");
  }

});


});
