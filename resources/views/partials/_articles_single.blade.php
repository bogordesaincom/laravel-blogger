@foreach($articles as $article)
<div class="ui card blogger-card fluid teal">
  <div class="content">
    <div class="right floated meta">{{ $article->published_at->diffForHumans()}}</div>
    <a href="{{url('about/'.$article->id)}}"><img class="ui avatar mini image" src="{{(!empty($article->author->avatar))? url('images/avatars/'.$article->author->avatar) : url('images/avatars/avatar_default.png')}}">
        {{$article->author_name}} {{ (!empty($article->author->job))? ', '.$article->author->job : "" }}
    </a>
  </div><!--end of content-->

  <div class="content">
    <div class="ui fluid image">

      <div class="ui teal ribbon label z-index-top">
        <a href="{{ url('categories/'.$article->category->slug) }}" class="white-font">{{$article->category_name}}</a>
      </div><!--end of category-name-->

      @if(Auth::check())
        <a class="ui right  teal corner label favorite" href="javascript:void(0)" data-id="{{ $article->id }}" data-content="Add to favourites" data-variation="inverted">
          <i class="{{($article->isFavourite())? 'yellow active ': 'white '}}star icon"></i>
        </a>
      @endif

      <a href="{{url('/blog/'.$article->slug)}}">
        <img class="ui fluid image lazy hoverable " data-original="{{(!empty($article->article_image))? url(config('blogger.filemanager.upload_path').'/'.$article->article_image): url('images/placeholder.gif')}}"
                  src="images/placeholder.gif" height="480" width="640" alt="picture">
        <noscript>
          <img class="ui fluid image hoverable" height="480" width="640" src="{{(!empty($article->article_image))? url(config('blogger.filemanager.upload_path').'/'.$article->article_image): url('images/placeholder.gif')}}">
        </noscript>
      </a>

    </div><!--end of image-->
    <h2><a href="{{url('/blog/'.$article->slug)}}">{{$article->title}}</a></h2>
  </div><!--end of content-->

  <div class="extra content">
          <i class="share icon"></i> Share via:
          @include('partials._share_buttons',['article' => $article])
  </div><!--end of content-->

</div><!--end of card-->
@endforeach
    <div class="ui card blogger-card fluid no-box-shadow text-center">
      {{ $articles->links() }}
    </div>

    <div class="ui card blogger-card fluid ">
      <div class="ui content text-center brand-teal">
      @include('partials._subscribe')
      </div>
    </div>
