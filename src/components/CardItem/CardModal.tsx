
'use client';

import { useState } from 'react';
import { Card } from '../../libs/types';
import CommentsModal from './CommentsModal';

interface CardModalProps {
  card: Card;
  onClose: () => void;
}

export default function CardModal({ card, onClose }: CardModalProps) {
  const [showComments, setShowComments] = useState(true);

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3> "Comments for"{card.title}</h3>
        <p>{card.description}</p>
        <button >Comments</button>
        <button onClick={onClose}>Close</button>
      </div>

      
        <CommentsModal card={card} onClose={() => setShowComments(false)} />
    
    </div>
  );
}
