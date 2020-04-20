package com.mycompany.project.fitnesstracker.model;

        import lombok.*;

        import javax.persistence.Entity;
        import javax.persistence.Id;
        import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Exercise {
    @Id
    private String id;
    private String name;
    private int duration;
    private int calories;
    private Date date;
    private String state;

    public Exercise(String id, String name, int duration, int calories) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.calories = calories;
    }
}
