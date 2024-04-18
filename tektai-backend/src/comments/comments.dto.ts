export class CommentsDto {
    userName: string;
    description: string;
    challengeId: string;
    date: Date;
    likes: number; // Number of likes for the comment
    replies: CommentReplyDto[]; // Array of replies to the comment
  senderName: any;
}

export class CommentReplyDto {
    senderName: string;
    description: string;
    date: Date;
}
