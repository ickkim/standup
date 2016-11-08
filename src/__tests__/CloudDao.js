// import FirebaseDao,{post} from '../FirebaseDao'
import firebase from 'firebase'
import FirebaseDao from '../FirebaseDao'
import config from '../config'
import Article from '../Article';
var article1 = Article();
var dao = new FirebaseDao(config);
var keys=[];

it('Object assign', function(){
  var article2 = Object.assign({},article1);
  article2.user = "Genji";
  article2.content = "다음";
  article2.urls[0].url = "http://www.daum.net";
  //article1의 값이 잘 전달되었는지 확인.
  expect(article1.urls[0].imgWidth).toEqual(article2.urls[0].imgWidth);
})
it('list article', ()=>{
  dao.list(25).then((articles)=>{
    articles.forEach((articles)=>{
      keys.push(articles.key);
      var article = articles.val();
      expect(article.user).toEqual("Genji");
    })
  });
})
var key;
it('upload article and edit',async ()=>{
  key = dao.newKey();
  const promise1 = await dao.update( key, article1 );
  return promise1;
});
it('find and delete',async ()=>{
  console.log(key);
  return dao.getArticle(key).then((article)=>{
    console.log(article.key,key);
    expect(article.key).toEqual(key);
    // dao.update(key, article2);
    dao.remove(key);
  });
});
/* 동기화 문제 때문인지 제대로 동작하지 않는다.
it('remove all ', function(){
  for(let i=0;i<keys.length;i++){
    dao.remove(keys[i]);
  }
})
*/