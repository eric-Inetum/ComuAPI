import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-customcalendario',
  templateUrl: './customcalendario.component.html',
  styleUrls: ['./customcalendario.component.css']
})
export class CustomcalendarioComponent {
  @Input() selected: Date = new Date();
  selectedDay: number | null = null;
  currentDay: number = new Date().getDate();
  customWeekDays: string[] = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
  activeDate: Date = new Date();
  daysInMonth: number[] = [];
  daysBeforeMonth: string[] = [];
  activeMonth: string = '';
  activeYear: number = 0;
  isClickeado: boolean = false;

  ngOnInit() {
    // Establecer el día actual como seleccionado al principio
    this.selectedDay = this.currentDay;
    this.generateCalendar();
  }

  constructor() {
    this.generateCalendar();
  }

  previousMonth() {
    this.activeDate = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.activeDate = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  selectDate(day: number) {
    
    this.selectedDay = parseFloat(day.toString());;
    // Lógica para seleccionar una fecha
    const newDate = new Date(this.activeYear, this.activeDate.getMonth(), day);
    this.selected = newDate;
  }

  private generateCalendar() {
    // Lógica para generar el calendario del mes actual
    this.daysInMonth = [];
    this.daysBeforeMonth = [];
    const year = this.activeDate.getFullYear();
    const month = this.activeDate.getMonth();
    this.activeMonth = this.getMonthName(month);
    this.activeYear = year;

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDay = firstDayOfMonth.getDay(); // 0 (Domingo) a 6 (Sábado)

    // Agregar días de la semana vacíos antes del primer día del mes
    if (startingDay == 0) {
      for (let i = 0; i < 6; i++) {
        this.daysBeforeMonth.push("");
        
      }
    } else {
      for (let i = 1; i < startingDay; i++) {
        this.daysBeforeMonth.push(""); // Puedes usar null o algún otro valor para representar días vacíos
      }
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      this.daysInMonth.push(day);
    }
  }

  private getMonthName(month: number): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[month];
  }
}
