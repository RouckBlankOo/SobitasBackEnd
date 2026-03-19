import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacturesController } from './factures.controller';
import { FacturesService } from './factures.service';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import {
  BonsCommandeController,
  BonsLivraisonController,
  DevisController,
} from './documents.controller';
import { Facture, FactureSchema } from './schemas/facture.schema';
import {
  DetailsFacture,
  DetailsFactureSchema,
} from './schemas/details-facture.schema';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import {
  DetailsTicket,
  DetailsTicketSchema,
} from './schemas/details-ticket.schema';
import { BonCommande, BonCommandeSchema } from './schemas/bon-commande.schema';
import {
  BonLivraison,
  BonLivraisonSchema,
} from './schemas/bon-livraison.schema';
import { Devis, DevisSchema } from './schemas/devis.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Facture.name, schema: FactureSchema },
      { name: DetailsFacture.name, schema: DetailsFactureSchema },
      { name: Ticket.name, schema: TicketSchema },
      { name: DetailsTicket.name, schema: DetailsTicketSchema },
      { name: BonCommande.name, schema: BonCommandeSchema },
      { name: BonLivraison.name, schema: BonLivraisonSchema },
      { name: Devis.name, schema: DevisSchema },
    ]),
  ],
  controllers: [
    FacturesController,
    TicketsController,
    BonsCommandeController,
    BonsLivraisonController,
    DevisController,
  ],
  providers: [FacturesService, TicketsService],
  exports: [FacturesService, TicketsService],
})
export class InvoicesModule {}
