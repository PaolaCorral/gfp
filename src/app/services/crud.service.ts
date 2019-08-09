import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User, Income, Expense } from '../interfaces/interfaces';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { forEach } from '@angular/router/src/utils/collection';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private usersCollection: AngularFirestoreCollection<User>;
  private User: Observable<User[]>;
  private incomesCollection: AngularFirestoreCollection<Income>;
  private Incomes: Observable<Income[]>;
  public totalIncomes: number;
  private expenseCollection: AngularFirestoreCollection<Expense>;
  private Expenses: Observable<Expense[]>;
  public userId: string;

  constructor( private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.totalIncomes = 0;

    // Obtiene el id del usuario concurrente
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        // Obtengo la coleccin de Ingresos con el ID dell usuario concurrente
        this.incomesCollection = db.collection<User>('users').doc(this.userId).collection('income');
        this.Incomes = this.incomesCollection.snapshotChanges().pipe(map(
          actions => {
            return actions.map(doc => {
              const data = doc.payload.doc.data();
              const id = doc.payload.doc.id;
              return {id, ...data};
            });
          }
        ));

        // Obtengo la coleccin de Egresos con el ID dell usuario concurrente
        this.expenseCollection = db.collection<User>('users').doc(this.userId).collection('expenses');
        this.Expenses = this.expenseCollection.snapshotChanges().pipe(map(
          actions => {
            return actions.map(doc => {
              const data = doc.payload.doc.data();
              const id = doc.payload.doc.id;
              return {id, ...data};
            });
          }
        ));
      }
    });

    // Obtengo la coleccion de usuarios ¿Util?
    this.usersCollection = db.collection<User>('users');
    this.User = this.usersCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  getUser() {
    return this.usersCollection.doc<User>(this.userId).valueChanges();
  }
  // Funciones Crud de ingresos
  getIncomes() {
    /* console.log(this.Incomes); */
    console.log(this.usersCollection.doc(this.userId).valueChanges());
    return this.Incomes;
  }
  getIncome(id: string) {
    console.log(this.usersCollection.doc(this.userId).collection('income').doc<Income>(id).valueChanges());
    return this.usersCollection.doc(this.userId).collection('income').doc<Income>(id).valueChanges();
  }
  updateIncome(income: Income, id: string, oldIncome: number) {
    // Resta el ingreso viejo y suma en nuevo para actualizar
    console.log(oldIncome);
    this.totalIncomes -= oldIncome;
    this.totalIncomes += income.income;
    this.usersCollection.doc(this.userId).update({TotalIncomes: this.totalIncomes});
    // actualiza solo el documento de ingreso
    return this.usersCollection.doc(this.userId).collection('income').doc(id).update(income);
  }
  addIncome(income: Income) {
    console.log('income agregado:', income)
    this.totalIncomes += income.income;
    console.log('Total:', this.totalIncomes);
    // Actualiza el valor total de todos los gastos
    this.usersCollection.doc(this.userId).update({TotalIncomes: this.totalIncomes});
    return this.usersCollection.doc<User>(this.userId).collection('income').add(income);
  }
  removeIncome(id: string, oldIncome: number) {
  // this.incomes -= income.income;
  this.totalIncomes -= oldIncome;
  console.log('Remuevo');
  this.usersCollection.doc(this.userId).update({TotalIncomes: this.totalIncomes});
  return this.usersCollection.doc(this.userId).collection('income').doc(id).delete();
  }
/* 
  getOnlyField(id: string){
    String value = this.usersCollection.doc(this.userId).
  } */

  // Funciones CRUD de Egresos:
  getExpenses() {
    return this.Expenses;
  }
  getExpense(id: string) {
    return this.usersCollection.doc(this.userId).collection('expenses').doc<Expense>(id).valueChanges();
  }
  updateExpense(expense: Expense, id: string) {
    return this.usersCollection.doc(this.userId).collection('expenses').doc(id).update(expense);
  }
  addExpense(expense: Expense) {
  return this.usersCollection.doc(this.userId).collection('expenses').add(expense);
  }
  removeExpense(id: string) {
    return this.usersCollection.doc(this.userId).collection('expenses').doc(id).delete();
  }

  // Total de todos

}
