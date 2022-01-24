using System;
using System.Collections.Generic;
using System.Linq;
using KCICApprovalQueue.Models;

namespace KCICApprovalQueue.Data
{
    /// <summary>
    /// Faux database
    /// </summary>
    public static class ClaimsRepository
    {
        /// <summary>
        /// 
        /// </summary>
        private static List<ClaimDataModel> _claims = new List<ClaimDataModel>()
        {
            new ClaimDataModel()
            {
                Product = "OLED TV",
                DateSubmitted = new DateTime(2017, 03, 14),
                Issue = "Dead Pixels",
                FirstName = "John",
                LastName = "Smith",
                PaymentAmount = 300,
                IsDocumented = true,
                claimAcceptanceStatus = "Approved"
            },
            new ClaimDataModel()
            {
                Product = "OLED TV",
                DateSubmitted = new DateTime(2019, 02, 02),
                Issue = "DOA",
                FirstName = "Jimmy",
                LastName = "John",
                PaymentAmount = 0,
                IsDocumented = false,
                claimAcceptanceStatus = "Reviewing"
            },
            new ClaimDataModel(){
                Product = "4k Monitor",
                DateSubmitted = new DateTime(2019, 01, 03),
                Issue = "Controller Board Failure",
                FirstName = "Dan",
                LastName = "Marino",
                PaymentAmount = 100,
                IsDocumented = true,
                claimAcceptanceStatus = "Rejected"
                
            }
        };

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static ClaimDataModel Get(Guid id)
        {
            return _claims.FirstOrDefault(x => x.ID == id);
        }

        public static List<ClaimDataModel> Get(Func<ClaimDataModel, bool> filter)
        {
            return _claims.Where(filter).ToList();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static List<ClaimDataModel> GetAll()
        {
            return _claims;
        }

        public static void Insert(ClaimDataModel claim)
        {
            _claims.Add(claim);
        }

        public static void Delete(Guid id)
        {
            var claimToRemove = _claims.FirstOrDefault(x => x.ID == id);
            _claims.Remove(claimToRemove);
        }

        // Implementation of approval & rejection
        public static void ApproveClaim(Guid id)
        {
            for(int i = 0; i < _claims.ToArray().Length; i++)
            {
                if (_claims[i].ID == id)
                {
                    _claims[i].claimAcceptanceStatus = "Approved";
                    return;
                }
            }
        }
        public static void RejectClaim(Guid id)
        {
            for (int i = 0; i < _claims.ToArray().Length; i++)
            {
                if (_claims[i].ID == id)
                {
                    _claims[i].claimAcceptanceStatus = "Rejected";
                    return;
                }
            }
        }



    }
}
