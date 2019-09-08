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
    public class HomeController : Controller
    {
        AsanaEntities1 db = new AsanaEntities1();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Authorise(Personel personel)
        {
            using (AsanaEntities1 db = new AsanaEntities1())
            {
                var userDetail = db.Personel.Where(x => x.AsanaId == personel.AsanaId && x.PersoEmail == personel.PersoEmail).FirstOrDefault();
                if(userDetail != null)
                {
                    Session["asanaID"] = personel.AsanaId;
                    return RedirectToAction("Index","Home");
                }
                else
                {
                    return View("Login", personel);
                }
            }           
        }
    }
}