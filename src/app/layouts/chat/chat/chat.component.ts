import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message;
  loggedUserName;

  public chatMessages: Observable<any[]>;
  chatMessagesArrayLength: any;

  constructor(private db: AngularFirestore,
              private authService: AuthService,
              private chatService: ChatService

) { }

  ngOnInit() {
    this.chatMessages = this.db.collection('/chatMessages').valueChanges();
    this.chatMessages.subscribe(result => {
      console.log(result);
      this.chatMessagesArrayLength = result.length;
    });
    // this.loggedUserName = this.authService.getCurrentUser().displayName;
  }
  sendChatMessage() {
    const messageObj = { message: this.message,
      // name: this.authService.getCurrentUser().displayName,
    sendTime: new Date()};
    this.chatService.sendMessages(messageObj);
    this.message = '';
  }


}
