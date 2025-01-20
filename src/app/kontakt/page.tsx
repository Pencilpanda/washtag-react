import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Kontakt() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 font-karla">Kapcsolat</h1>
      <p className="mb-8 font-inconsolata">Lépjen kapcsolatba velünk kérdéseivel, partneri ajánlataival vagy támogatásért.</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 font-karla">Kapcsolatfelvételi űrlap</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 font-inconsolata">Név</label>
              <Input id="name" placeholder="Az Ön neve" className="font-inconsolata" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-inconsolata">E-mail cím</label>
              <Input id="email" type="email" placeholder="pelda@email.com" className="font-inconsolata" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-inconsolata">Üzenet</label>
              <Textarea id="message" placeholder="Írja ide üzenetét..." className="font-inconsolata" />
            </div>
            <Button type="submit" className="bg-[#1CBA8D] hover:bg-[#19A67E] text-white font-inconsolata">
              Üzenet küldése
            </Button>
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4 font-karla">Elérhetőségeink</h2>
          <div className="space-y-4 font-inconsolata">
            <p><strong>Cím:</strong> 1234 Budapest, Példa utca 1.</p>
            <p><strong>Telefon:</strong> +36 1 234 5678</p>
            <p><strong>E-mail:</strong> info@washtag.hu</p>
            <p><strong>Nyitvatartás:</strong><br />
              Hétfő - Péntek: 9:00 - 17:00<br />
              Szombat - Vasárnap: Zárva
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

