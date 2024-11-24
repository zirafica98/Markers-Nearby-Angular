import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-marker-info',
  templateUrl: './marker-info.component.html',
  styleUrl: './marker-info.component.scss'
})
export class MarkerInfoComponent {
  @Input() date:string = "";
  @Input() marker_name:string="";
  @Input() text_wrap:string = "";
  @Input() wiki_link:string="";
  @Input() lat:string="";
  @Input() long:string="";
  @Input() link_youtube:string = "";
  @Input() bc_ad:string = ""
  @Input() dataLoaded: boolean = false;


  ngOnInit(){
    this.date = this.dateFormater(this.date);
    
  }



  dateFormater(date:string){
    const words = date.split('/');
    var mon=words[0]
    var day=words[1]
    var year=words[2]
  
    if(mon = "1"){
      mon = "Jan"
    }else if (mon = '2'){
      mon = "Feb"
    }else if (mon = '3'){
      mon = "Mar"
    }else if (mon = '4'){
      mon = "Apr"
    }else if (mon = '5'){
      mon = "May"
    }else if (mon = '6'){
      mon = "Jun"
    }else if (mon = '7'){
      mon = "Jul"
    }else if (mon = '8'){
      mon = "Avg"
    }else if (mon = '9'){
      mon = "Sep"
    }else if (mon = '10'){
      mon = "Oct"
    }else if (mon = '11'){
      mon = "Nov"
    }else if (mon = '12'){
      mon="Dec"
    }
    return mon+" "+day + " " +year
  }

  onPlayVideo(){

  }

}
