import { useContext, useEffect, useState } from "react";
import {
  useGetFavoriteMutation,
  useGetRecentViewMutation,
  useGetUserProfileMutation,
  useGetUserSessionMutation,
  useGetUserSessionProfileMutation,
  useValidateUserSessionMutation,
  useBuyContentMutation,
  useGetBoughtMutation,
  useGetQuestionListMutation,
  useGetQuestionMutation,
  useRegisterQuestionMutation,
  useGetFavoriteWebnovelMutation,
  useGetChargeLogMutation,
  useBuyAllContentMutation,
  useGetUserBuyDetailMutation,
  useGetUserHistoryMutation,
} from "@services/user";
import { LanguageContext } from "@context/LanguageContext";
import { useAppDispatch, useAppSelector } from "@store";
import { setUser } from "@features/common/globalUserSlice";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const dispatch = useAppDispatch();

  const { userId, name, token, email, login, session_token } = useAppSelector(
    (state) => {
      return state.storage.session.globalUserSlice;
    }
  );
  const {
    userId: userIdLocal,
    name: nameLocal,
    token: tokenLocal,
    email: emailLocal,
    login: loginLocal,
    session_token: session_token_local,
    keeplogin,
  } = useAppSelector((state) => {
    return state.storage.local.globalUserSlice;
  });

  const [ip, setIp] = useState<string>("");

  useEffect(() => {
    // get my ip using fetch to api.ipify.org
    fetch("https://geolocation-db.com/json/")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setIp(res.IPv4);
      });
  }, []);

  useEffect(() => {
    if (keeplogin) {
      dispatch(
        setUser({
          name: nameLocal,
          userId: userIdLocal,
          email: emailLocal,
          token: tokenLocal,
          session_token: session_token_local,
          login: loginLocal,
        })
      );
    }
  }, [keeplogin]);

  const { currentLanguage } = useContext(LanguageContext);

  const [recentView, setRecentView] = useState<any>([
    {
      thumbnails: { thumbnail: "/placeholder.webp" },
      webtoon_name: "",
      webtoon_id: 0,
    },
  ]);
  const [recentViewCnt, setRecentViewCnt] = useState<number>(-1);
  const [favorite, setFavorite] = useState<any>([
    {
      thumbnails: { thumbnail: "/placeholder.webp" },
      webtoon_name: "",
      webtoon_id: 0,
    },
  ]);
  const [favoriteNovel, setFavoriteNovel] = useState<any>([
    {
      thumbnails: { thumbnail: "/placeholder.webp" },
      webtoon_name: "",
      webtoon_id: 0,
    },
  ]);
  const [buylog, setBuyLog] = useState<any>([
    {
      thumbnails: { thumbnail: "/placeholder.webp" },
      webtoon_name: "",
      webtoon_id: 0,
    },
  ]);
  const [chargeLog, setChargeLog] = useState<any>([]);

  const [getFavorite, { data: favoriteWebtoonData }] = useGetFavoriteMutation();
  const [getFavoriteWebnovel, { data: favoriteWebnovelData }] =
    useGetFavoriteWebnovelMutation();
  const [favoriteCnt, setFavoriteCnt] = useState<number>(-1);
  const [getRecentView, { data: recentViewWebtoonData }] =
    useGetRecentViewMutation();
  const [getUserProfile, { data: userProfileData }] =
    useGetUserProfileMutation();
  const [getBought, { data: boughtData }] = useGetBoughtMutation();
  const [boughtCnt, setBoughtCnt] = useState<number>(-1);

  const [buyContent, { data: buyContentData }] = useBuyContentMutation();
  const [buyAllContent, { data: buyAllContentData }] = useBuyAllContentMutation();

  const [getUserSession, { data: userSessionData }] =
    useGetUserSessionMutation();
  const [getUserSessionProfile, { data: userSessionProfileData }] =
    useGetUserSessionProfileMutation();
  const [validateUserSession, { data: validateUserSessionData }] =
    useValidateUserSessionMutation();

  const [getQuestionList, { data: questionListData }] =
    useGetQuestionListMutation();
  const [getQuestion, { data: questionData }] = useGetQuestionMutation();
  const [registerQuestion, { data: registerQuestionData }] =
    useRegisterQuestionMutation();

  const [getChargeLog, { data: chargeLogData }] = useGetChargeLogMutation();
  const [getUserBuyDetail, { data: userBuyData }] = useGetUserBuyDetailMutation();
  const [chargeLogCnt, setChargeLogCnt] = useState<number>(-1);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [getUserHistory, { data: userHistoryData }] = useGetUserHistoryMutation();

  useEffect(() => {
    getFavorite({
      page: 1,
      count: 10,
      token: session_token,
    });
    if(userId !== -1) {
      getFavoriteWebnovel({
        page: 1,
        count: 10,
        token: session_token,
      });
    }
    getRecentView({
      page: 1,
      count: 20,
      IsValid: 0,
      sort: "desc",
      token: session_token,
    });
    if(userId !== -1) {
      getBought({
        page: 1,
        count: 10,
        sort: "desc",
        token: session_token,
      });
    }
    getQuestionList({ page: 1, count: 5, token: session_token });

  }, []);

  useEffect(() => {
    if (registerQuestionData)
      getQuestionList({ page: 1, count: 5, token: session_token });
  }, [registerQuestionData]);

  useEffect(() => {
    if (token) {
      getUserProfile({session_token: session_token});
    }
  }, [token]);

  // useEffect(() => {
  //   if (userId !== -1 && ip !== "") {
  //     getUserSession({ user_id: userId, ip_addr: ip });
  //   }
  // }, [userId, ip]);

  useEffect(() => {
    if (session_token) {
      // dispatch(setUser({ session_token: session_token }));
      getUserSessionProfile({ session_token: session_token });
    }
  }, [session_token]);

  useEffect(() => {
    if (userSessionProfileData) {
      dispatch(setUser({ balance: userSessionProfileData.balance }));
    }
  }, [userSessionProfileData]);

  useEffect(() => {
    if (chargeLogData) {
      setChargeLogCnt(chargeLogData.length)
      setChargeLog(chargeLogData);
    }
  }, [chargeLogData]);

  useEffect(() => {
    if (recentViewWebtoonData) {
      setRecentViewCnt(recentViewWebtoonData.length);
    }
    if (favoriteWebtoonData) {
      setFavoriteCnt(favoriteWebtoonData.length);
    }
    if (favoriteWebnovelData) {
      setFavoriteCnt(favoriteWebnovelData.length);
    }
    if (boughtData) {
      setBoughtCnt(boughtData.length);
    }

    if (recentViewWebtoonData && recentViewWebtoonData.length > 0) {
      setRecentView(
        recentViewWebtoonData.map((dat: any) => {
          // console.log(dat);
          return {
            ...dat,
            thumbnails: { thumbnail: dat.episode.thumbnail_image },
            webtoon_name: dat.episode.name,
            webtoon_id: dat.EpisodeID,
            episode_id: dat.EpisodeID,
            ID: dat.ContentID,
          };
        })
      );
    }
    if (favoriteWebtoonData && favoriteWebtoonData.length > 0 && userId !== -1) {
      setFavorite(
        favoriteWebtoonData.map((dat: any) => {
          return {
            dat,
            thumbnails: { thumbnail: dat.Webtoon.thumbnail_image },
            webtoon_name: dat.Webtoon.webtoon_name,
            webtoon_id: dat.WebtoonID,
            ContentType: 0,
          };
        })
      );
    } else {
      setFavorite([
        {
          thumbnails: { thumbnail: "/placeholder.webp" },
          webtoon_name: "",
          webtoon_id: 0,
        }
      ]);
    }
    if (favoriteWebnovelData && favoriteWebnovelData.length > 0) {
      setFavoriteNovel(
        favoriteWebnovelData.map((data: any) => {
          return {
            data,
            thumbnails: { thumbnail: data.Novel.thumbnail_image },
            webtoon_name: data.Novel.novel_name,
            webtoon_id: data.NovelID,
            dat: { Webtoon: data.Novel },
            ContentType: 1,
          };
        })
      );
    } else {
      setFavoriteNovel([
        {
          thumbnails: { thumbnail: "/placeholder.webp" },
          webtoon_name: "",
          webtoon_id: 0,
        },
      ])
    }
    if (boughtData && boughtData.length > 0  && userId !== -1) {
      setBuyLog(
        boughtData.map((dat: any) => {
          return {
            ...dat,
            thumbnails: { thumbnail: dat.thumbnail_image },
            webtoon_name: dat.EpisodeName,
            webtoon_id: dat.EpisodeID,
          };
        })
      );
    } else {
      setBuyLog([
        {
          thumbnails: { thumbnail: "/placeholder.webp" },
          webtoon_name: "",
          webtoon_id: 0,
        },
      ])
    }
  }, [
    recentViewWebtoonData,
    favoriteWebtoonData,
    boughtData,
    favoriteWebnovelData,
    userId
  ]);

  const reQuery = () => {
    getFavorite({
      page: 1,
      count: 10,
      token: session_token,
    });
  };

  const buyWebtoon = async (
    contentId: number,
    episodeId: string,
    purchaseType: number,
  ) => {
    if(userId && userId > -1) {
      let data = (await buyContent({
        ID: Number(contentId),
        EpisodeID: `${contentId}_E${episodeId}`,
        ContentType: 0,
        PurchaseType: purchaseType,
        token: session_token,
      })) as any;
      return data;
    } else {
      return -1
    }
  };

  const buyWebnovel = async (
    contentId: number,
    episodeId: string,
    purchaseType: number
  ) => {
    if(userId && userId > -1) {
      let data = (await buyContent({
        ID: Number(contentId),
        EpisodeID: `${contentId}_E${episodeId}`,
        ContentType: 1,
        PurchaseType: purchaseType,
        token: session_token,
      })) as any;
      return data;
    } else {
      return -1
    }
  };

  const logout = () => {
    dispatch(
      setUser({
        userId: -1,
        name: "",
        email: "",
        token: "",
        session_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjotMSwidXNlcl9pcCI6IjIwMDE6MmQ4OmU3MjA6ZDk3ZjplY2I5OjYwNmQ6YmMzNzoyOGI4IiwidmFsaWRGcm9tIjoiMjAyNC0wNC0yMiAxNDowMzo0MSBLU1QiLCJjcmVhdGVkQXQiOiIyMDI0LTA0LTIyIDE0OjAzOjQxIEtTVCIsImV4cGlyZWRBdCI6IjIwMjQtMDQtMjIgMTQ6MTM6NDEgS1NUIiwidGltZXpvbmUiOiJBc2lhL1Nlb3VsIn0.GobIvGdgv-48yxbPvfJu9kaOaMKqkxhYZbMg4LwSUPA",
        balance: 0,
        login: "",
      })
    );
  };

  const regQ = async (title: string, content: string) => {
    await registerQuestion({
      token: session_token,
      Title: title,
      Content: content,
      Category: "common",
    });
  };

  const buyAllRemainContent = async (
    contentId: number,
    contentType: number,
    props_session_token: any,
  ) => {
    if(userId && userId > -1) {
      let data = (await buyAllContent({
        contentId: Number(contentId),
        ContentType: contentType,
        token: props_session_token
      })) as any;
      return data;
    } else {
      return -1
    }
  };

  const userBuyDetail = async (
    contentId: number,
    contentType: number,
    props_session_token: any,
  ) => {
    if(userId && userId > -1) {
      let data = (await getUserBuyDetail({
        contentId: Number(contentId),
        ContentType: contentType,
        token: props_session_token
      })) as any;
      return data;
    } else {
      return -1
    }
  };

  const userHistory = async (
    page: number,
    count: number,
    sort: string,
    props_session_token: any,
  ) => {
    if(userId && userId > -1) {
      let data = (await getUserHistory({
        page: page,
        count: count,
        sort: sort,
        token: props_session_token
      })) as any;
      return data;
    } else {
      return -1
    }
  };

  return {
    userId,
    userName: name,
    session_token,
    favoriteWebtoonData: favorite,
    favoriteWebnovelData: favoriteNovel,
    recentViewWebtoonData: recentView,
    login,
    logout,
    userProfileData,
    buyWebtoon,
    buyWebnovel,
    reQuery,
    buylog,
    registerQuestion: regQ,
    questionListData,
    questionData,
    getFavorite,
    getFavoriteWebnovel,
    chargeLog,
    getRecentView,
    currentLanguage,
    recentViewCnt,
    favoriteCnt,
    getBought,
    boughtCnt,
    getChargeLog,
    chargeLogCnt,
    isDrawerOpen,
    setIsDrawerOpen,
    buyAllRemainContent,
    userBuyDetail,
    getUserSessionProfile,
    userSessionData,
    userHistory,
  };
};
