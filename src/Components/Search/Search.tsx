import "@/Components/Search/Search.scss";
import { dataApi } from "@/Api/foodApi";
import { FoodKeywordContext } from "@/Store/SearchContext";
import { useContext, useEffect, useState } from "react";
import SearchItem from "@/Components/Search/Component/SearchItem";
import SearchPaging from "@/Components/Search/Component/SearchPaging";

function SearchPage() {
  const [count, setCount] = useState(10); //아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지. 기본값 '1'
  const [postPerPage] = useState(10); //한 페이지에 보여질 아이템 수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); //현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); //현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState<FoodItem[]>([]); //현재 페이지에서 보여지는 아이템

  const [foodlist, setFoodlist] = useState<FoodItem[]>([]);
  const { keyword } = useContext(FoodKeywordContext);

  const setPage = (error: any) => {
    setCurrentPage(error);
  };

  // const {isLoading, error, data:caloryData}
  //   = useQuery(['caloryData',keyword], ()=>{
  //     return dataApi(keyword).then((res)=>{
  //       const data = res.body.items; //타입스크립트 수정 준비
  //       const calorys = data.map((item:FoodItem) => ({...item, check: false, id: uuidv4()}));
  //       setFoodlist(calorys);
  //       setCount(data.length);
  //       return calorys;
  //     })
  // })
  // // console.log(caloryData);


  // 유즈파람 수정하기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dataApi(keyword);
        const datas = response?.body.items; //타입스크립트 수정 준비
        const imsi = datas.map((item) => ({...item, check: false}))
        console.log(imsi);
        setFoodlist(imsi);
        setCount(datas.length);
      } catch (error) {
        console.error("음식정보 리스트 영역 오류", error);
      }
    };
    void fetchData();
  }, [keyword]);

  useEffect(() => {
    setIndexOfLastPost(currentPage * postPerPage); //현재 페이지와 한 페이지에 보여질 아이템 수를 곱하여 결과 값을 setIndexOfLastPost에 넘긴다. -> 마지막 포스트 수는 3
    setIndexOfFirstPost(indexOfLastPost - postPerPage); //indexOfLastPost의 값과 한 페이지에 보여질 아이템 수를 뺀다 그 결과를 setIndexOfFirstPost에 전달 -> 첫번째 포스트는 0
    setCurrentPosts(foodlist.slice(indexOfFirstPost, indexOfLastPost)); //products의 배열을 현재 페이지의 첫번째와 마지막에 인덱스까지 값을 복사, 반환하여 setCurrentPosts에 전달
  }, [currentPage, indexOfLastPost, indexOfFirstPost, postPerPage, foodlist]); //위에 기능이 끝나면 배열 안의 결과들을 한 번 실행


  return (
    <div className="Container">
      <div className="SearchBar">
        <div className="SearchBarTitle">검색 결과</div>
        <div className="SearchBarText">
          <span className="WhitePoint">{keyword}</span>에 대한 총
          <span className="WhitePoint">{foodlist.length}</span>개 결과가
          나왔습니다.
        </div>
      </div>
      <div className="CardContainer">
        {currentPosts && currentPosts.length > 0 ? (
          currentPosts.map((item, index) => {
            return (
              <SearchItem
                key={index} //배열 번호로 사용
                title={item.DESC_KOR}
                calories={item.NUTR_CONT1}
                carbs={item.NUTR_CONT2}
                protein={item.NUTR_CONT3}
                fat={item.NUTR_CONT4}
                sugar={item.NUTR_CONT5}
                sodium={item.NUTR_CONT6}
                serving={item.SERVING_WT}
                id={item.id}
              />
            );
          })
        ) : (
          <>데이터가 없습니다.</>
        )}
      </div>
      <div className="Pagenation">
        <SearchPaging page={currentPage} count={count} setPage={setPage} />
      </div>
    </div>
  );
}

export default SearchPage;
