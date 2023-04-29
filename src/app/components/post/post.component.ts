import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  @Input() currentUser: IUser = {
    id: '',
    userName: '',
    displayUsername: '',
    email: '',
    dateRegistrated: new Date,
    posts: [],
    comments: [],
    postLikes: [],
    commentLikes: [],
    followers: [],
    followedUsers: [],
    individualChats: [],
    groupChats: [],
    individualChatMessages: [],
    groupChatMessages: [],
    notifications: []
  }
  @Input() posts: IPost[] = [];
  @Input() post: IPost = {
    id: 0,
    content: '',
    dateCreated: new Date,
    userId: this.currentUser.id,
    comments: [],
    postLikes: [],
  };
  postOwner: IUser = {
    id: '',
    userName: '',
    displayUsername: '',
    email: '',
    profilePictureUrl: '',
    profileBackgroundUrl: '',
    posts: [],
    comments: [],
    postLikes: [],
    commentLikes: [],
    followers: [],
    followedUsers: [],
    individualChats: [],
    groupChats: [],
    individualChatMessages: [],
    groupChatMessages: [],
    notifications: [],
    dateRegistrated: new Date(),
  };
  isLikeHovering: boolean = false;
  constructor(private postService: PostService, private userService: UserService, public accountService: AccountService) {}
  ngOnInit(): void {
    this.userService.getById(this.post.userId).subscribe(res => this.postOwner = res)
  }
  isEditing: boolean = false;
  editedContent: string = "";
  toggleEditing() {
    this.editedContent = this.post.content;
    this.isEditing = !this.isEditing;
  }
  savePost() {
    if (this.editedContent.trim() !== '') {
      this.post.content = this.editedContent;
      this.postService.edit(this.post).subscribe();
    }
    this.isEditing = false;
  }
  cancelEditing() {
    this.isEditing = false;
  }
  deletePost() {
    this.posts.splice(this.posts.indexOf(this.post), 1);
    this.postService.delete(this.post.id).subscribe();;
  }
}
