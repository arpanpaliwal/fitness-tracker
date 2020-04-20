package com.mycompany.project.fitnesstracker.controller;

import com.mycompany.project.fitnesstracker.model.Exercise;
import com.mycompany.project.fitnesstracker.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ExerciseController {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @GetMapping("/exercises")

    public Collection<Exercise> getAllExercises(){
        return exerciseRepository.findAll();
    }
}
