using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class PersonelController : Controller
    {
        AsanaEntities1 db = new AsanaEntities1();
        // GET: Personel
        public ActionResult Index()
        {
            return View(db.Personel.ToList());
        }

        public ActionResult Create()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Create(Personel personel, HttpPostedFileBase File)
        {
            var authorExist = db.Personel.Any(m => m.PersoEmail == personel.PersoEmail);

            if (authorExist == false)
            {
                //author.AddedBy = "Hikmet Tüzüner";
                if (File != null)
                {
                    FileInfo fileinfo = new FileInfo(File.FileName);                
                    WebImage img = new WebImage(File.InputStream);
                    string uzanti = (Guid.NewGuid().ToString() + fileinfo.Extension).ToLower();
                    img.Resize(225, 180, false, false);
                    string tamyol = "~/images/users/" + uzanti;
                    img.Save(Server.MapPath(tamyol));
                    personel.Image = "/images/users/" + uzanti;
                }
                db.Personel.Add(personel);
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        public ActionResult Delete(int? Id)
        {
            if (Id == null)
            {
                return HttpNotFound();
            }
            Personel Personel = db.Personel.Find(Id);
            db.Personel.Remove(Personel);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult Edit(int? Id)
        {
            if (Id == null || Id==0)
            {
                return HttpNotFound();
            }
            Personel personel = db.Personel.Find(Id);
            return View(personel);
        }

        [HttpPost]
        public ActionResult Edit(Personel personel, HttpPostedFileBase File)
        {
            if (personel != null)
            {
                db.Entry(personel).State = System.Data.Entity.EntityState.Modified;
                if (File != null)
                {
                    FileInfo fileinfo = new FileInfo(File.FileName);
                    WebImage img = new WebImage(File.InputStream);
                    string uzanti = (Guid.NewGuid().ToString() + fileinfo.Extension).ToLower();
                    img.Resize(225, 180, false, false);
                    string tamyol = "~/images/users/" + uzanti;
                    img.Save(Server.MapPath(tamyol));
                    personel.Image = "/images/users/" + uzanti;
                }
                else
                {
                    db.Entry(personel).Property(m => m.Image).IsModified =false;
                }
            }
            db.SaveChanges();
            return RedirectToAction("Index","Personel");
        }

        public ActionResult Temsa(int? Id)
        {
            if (Id == null || Id == 0)
            {
                return HttpNotFound();
            }
            Personel personel = db.Personel.Find(Id);
            return View(personel);
        }
    }
}