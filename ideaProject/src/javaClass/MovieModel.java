package javaClass;

import java.lang.reflect.Array;

public class MovieModel {
    private String id;
    private String title;
    private String coverageUrl;
    private String average;
    private Array stars;

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

    public Array getStars() {
        return stars;
    }

    public void setStars(Array stars) {
        this.stars = stars;
    }
}
