# **Health Tracker - Workout Tracker **

**Health Tracker** is a modern **workout tracking app** built with **Angular** and **PrimeNG**. Track workouts, visualize progress, and stay consistent with your fitness goals!

## **Features**

✅ Log and track multiple workouts  
✅ Auto-count repeated exercises (e.g., "Running (3)")  
✅ Interactive charts to analyze progress
✅ Responsive UI with **PrimeNG**  
✅ Data persistence via **Local Storage**

## **Tech Stack**

- **Angular 19** + **PrimeNG**
- **RxJS** for reactivity
- **Chart.js** for analytics
- **Tailwind CSS** for styling

## **Getting Started**

```sh
git clone https://github.com/yourusername/primefit.git
cd primefit
npm install
ng serve
```

App runs at **`http://localhost:4200`**

To meet the assignment requirements, you should add a **Code Coverage Report** section in your README. Here's what to include:

---

## **Code Coverage Report**

This project maintains **100% unit test coverage** for:  
✅ **Workout Service** (`workout.service.ts`)  
✅ **Workout Form Component** (`workout-form.component.ts`)

### **Running Tests & Generating Coverage**

To run the unit tests and generate a coverage report, use:

```sh
ng test --code-coverage
```

### **Coverage Summary**

```
=============================== Coverage summary ===============================
Statements   : 100% ( 37/37 )
Branches     : 100% ( 8/8 )
Functions    : 100% ( 8/8 )
Lines        : 100% ( 36/36 )
================================================================================
```
