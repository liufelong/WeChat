package javaClass;

import java.lang.reflect.Array;
import java.util.List;

public class MovieModel {
    private String id;
    private String title;
    private String coverageUrl;
    private String average;
    private List<Integer> stars;

    public MovieModel(String id, String title, String coverageUrl, String average, List<Integer> stars) {
        this.id = id;
        this.title = title;
        this.coverageUrl = coverageUrl;
        this.average = average;
        this.stars = stars;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCoverageUrl() {
        return coverageUrl;
    }

    public void setCoverageUrl(String coverageUrl) {
        this.coverageUrl = coverageUrl;
    }

    public String getAverage() {
        return average;
    }

    public void setAverage(String average) {
        this.average = average;
    }

    public List<Integer> getStars() {
        return stars;
    }

    public void setStars(List<Integer> stars) {
        this.stars = stars;
    }
}
