package servlet;

import com.google.gson.Gson;
import javaClass.JsonTool;
import javaClass.ListClass;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "ListServlet",urlPatterns = "/list")
public class ListServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String jsonString = JsonTool.requstInputToJsonString(request);
        System.out.println("ListServlet-收到了POST请求");
        System.out.println(jsonString);
        Gson gson = new Gson();
        ListClass listClass = gson.fromJson(jsonString,ListClass.class);

        response.setContentType("text/html;charset=utf-8");
        PrintWriter writer = response.getWriter();
        writer.println(listClass.homeData());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("收到了get请求");
    }
}
