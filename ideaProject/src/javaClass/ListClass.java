package javaClass;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import java.io.*;
import java.lang.reflect.Array;
import java.lang.reflect.Type;
import java.util.ArrayList;

public class ListClass {
    private String listType;

    public String getListType() {
        return listType;
    }

    public void setListType(String listType) {
        this.listType = listType;
    }

    public String getAllList(){
        String path = "/Users/liufeilong/Desktop/WeChatProjects/WeChat/ideaProject/resouce/hostMovie.json";
        File file = new File(path);
        String jsonString = "";
        FileInputStream fileInputStream = null;
        InputStreamReader inputStreamReader = null;
        BufferedReader bufferedReader = null;

        try {
            fileInputStream = new FileInputStream(file);
            inputStreamReader = new InputStreamReader(fileInputStream,"utf-8");
            bufferedReader = new BufferedReader(inputStreamReader);
            String line = null;
            while ((line = bufferedReader.readLine()) != null){
                jsonString += line;
            }
        } catch (FileNotFoundException | UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        } catch (IOException e) {
            e.printStackTrace();
        }

        //Json的解析类对象
        JsonParser parser = new JsonParser();
        //将JSON的String 转成一个JsonArray对象
        JsonArray jsonArray = parser.parse(jsonString).getAsJsonArray();

        System.out.println(jsonArray);

        Gson gson = new Gson();
//        ArrayList<MovieModel> movieArr = new ArrayList<MovieModel>();

        ArrayList<MovieModel> movieArr = gson.fromJson(jsonString,new TypeToken<MovieModel>(){}.getType());
        //加强for循环遍历JsonArray
//        for (JsonElement e : jsonArray) {
//            //使用GSON，直接转成Bean对象
//            MovieModel movieModel = gson.fromJson(e, MovieModel.class);
//            movieArr.add(movieModel);
//        }

        MovieClass movieClass = new MovieClass();
        for (int i = 0; i < movieArr.size(); i++) {
            MovieModel movieModel = movieArr.get(i);
            if (i < 3){
                movieClass.inTheaters.add(movieModel);
            }else {
                movieClass.commingSoon.add(movieModel);
                movieClass.top250.add(movieModel);
            }
        }
        String json = gson.toJson(movieClass);
        return json;
    }

    public class MovieClass{
        private ArrayList<MovieModel> inTheaters = new ArrayList<MovieModel>();
        private ArrayList<MovieModel> commingSoon = new ArrayList<MovieModel>();
        private ArrayList<MovieModel> top250 = new ArrayList<MovieModel>();

        public ArrayList<MovieModel> getInTheaters() {
            return inTheaters;
        }

        public void setInTheaters(ArrayList<MovieModel> inTheaters) {
            this.inTheaters = inTheaters;
        }

        public ArrayList<MovieModel> getCommingSoon() {
            return commingSoon;
        }

        public void setCommingSoon(ArrayList<MovieModel> commingSoon) {
            this.commingSoon = commingSoon;
        }

        public ArrayList<MovieModel> getTop250() {
            return top250;
        }

        public void setTop250(ArrayList<MovieModel> top250) {
            this.top250 = top250;
        }
    }
}
